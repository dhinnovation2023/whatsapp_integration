import { NextRequest } from 'next/server';
import { dbConnect } from '@/config/dbConfig';
import MessagesModel from '@/models/messages';
import ContactsModel from '@/models/contacts';

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
        throw new Error("Phone number is required!");
    }

    const stream = new ReadableStream({
        start(controller) {
            const changeStream = ContactsModel.watch(
                [
                    {
                        $match: {
                            "fullDocument.assigned": {
                                $in: ["123"]
                            }
                        }
                    }
                ]
            );

            changeStream.on('change', (change) => {
                controller.enqueue(`data: ${JSON.stringify(change)}\n\n`);
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
