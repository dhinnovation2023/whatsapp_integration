import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "../common"
import ContactsModel, { ContactsModelInterface } from "@/models/contacts";
import { getServerSession } from "next-auth";
import TeamMemberModel, { TeamMembersModelInterface } from "@/models/team-member";

export interface FetchContactsFilterOptions {
    currentPage: number, // page number start from 1
    search?: string,
    assigned?: string,
    date?: {
        start: number,
        end: number,
    },
}

export async function fetchAllContacts(data: FetchContactsFilterOptions) {
    return new Promise<ContactsModelInterface[]>(async (resolve, reject) => {
        try {

            const limit = 10 // 10 contacts per request
            const skip = (data.currentPage - 1) * limit;

            await dbConnect();

            const userSession = await getServerSession();
            const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

            if (!userSession?.user) {
                throw new Error("User is not logged in");
            } else if (!SUPER_ADMIN_EMAIL) {
                throw new Error("Please provide SUPER_ADMIN_EMAIL in .env file.")
            }

            const findQuery: {
                // eslint-disable-next-line
                [key: string]: any,
            } = {};

            if (userSession.user.email !== SUPER_ADMIN_EMAIL) {

                const user = await TeamMemberModel.findOne({ email: userSession.user.email }) as TeamMembersModelInterface;
                if (!user) {
                    throw new Error("User not found!");
                }

                findQuery["assigned"] = user.userId;
            } else {
                if (data.assigned) {
                    findQuery["assigned"] = data.assigned;
                }
            }

            if (data.search) {
                findQuery['$and'] = [
                    { name: { regex: data.search } },
                    { phone: { reqex: data.search } }
                ];
            }

            if (data.date) {
                const startDate = new Date(data.date.start)
                const endDate = new Date(data.date.end);

                findQuery['createdAt'] = {
                    $gte: startDate, 
                    $lte: endDate,
                }

            }

            console.log(findQuery);

            const contacts = await ContactsModel.find(findQuery, null, {
                sort: { updatedAt: -1 },
                skip,
                limit,
            });
            return resolve(contacts);

        } catch (err) {
            const message = handleCatchBlock(err);
            reject(message);
        }
    })
}

export async function fetchOneContactByPhone(phone: string) {
    return new Promise<ContactsModelInterface>(async (resolve, reject) => {
        try {

            await dbConnect();

            const contact = await ContactsModel.findOne({ phone });

            return resolve(contact);

        } catch (err) {
            return reject(err);
        }
    })
}