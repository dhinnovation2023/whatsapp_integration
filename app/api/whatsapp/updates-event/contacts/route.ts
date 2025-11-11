import { NextRequest } from 'next/server';
import { dbConnect } from '@/config/dbConfig';
import ContactsModel from '@/models/contacts';
import { getServerSession } from 'next-auth';
import TeamMemberModel, { TeamMembersModelInterface } from '@/models/team-member';
import { fetchLastChatByPhone } from '@/functions/whatsapp/fetchLastChatByPhone';
import { CustomContactsCardDataInterface } from '../../fetch-contacts/all/route';

export async function GET(req: NextRequest) {
    await dbConnect();

    const userSession = await getServerSession();
    const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

    if (!userSession?.user) {
        throw new Error("User is not loggedin");
    }

    if (!SUPER_ADMIN_EMAIL) {
        throw new Error("please provide SUPER_ADMIN_EMAIL in .env");
    }

    const user = await TeamMemberModel.findOne({ email: userSession.user.email }) as TeamMembersModelInterface;

    if (!user) {
        throw new Error("User not found!");
    }

    const findQuery: {
        // eslint-disable-next-line
        [key: string]: any,
    } = {};

    const isSuperAdmin = user.email === SUPER_ADMIN_EMAIL;

    if (!isSuperAdmin) {
        findQuery["$match"] = {
            "fullDocument.assigned": user.userId,
        }
    }

    const stream = new ReadableStream({
        start(controller) {
            const changeStream = ContactsModel.watch(!isSuperAdmin ? [findQuery] : undefined, { fullDocument: "updateLookup" });

            changeStream.on('change', async (change) => {
                const lastChat = await fetchLastChatByPhone({ phone: change.fullDocument.phone });
                const data: CustomContactsCardDataInterface = {
                    ...change.fullDocument,
                    lastChat,
                }

                const newContact: {
                    fullDocument: CustomContactsCardDataInterface,
                } = {
                    fullDocument: data,
                }

                controller.enqueue(`data: ${JSON.stringify(newContact)}\n\n`);
            });

            changeStream.on('error', (err) => {
                controller.enqueue(`event: error\ndata: ${err.message}\n\n`);
            });

            req.signal.addEventListener('abort', () => {
                changeStream.close();
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    });
}
