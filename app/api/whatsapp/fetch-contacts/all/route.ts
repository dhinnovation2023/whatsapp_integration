import { handleCatchBlock } from "@/functions/common";
import { fetchAllContacts } from "@/functions/whatsapp/fetchContacts";
import { fetchLastChatByPhone } from "@/functions/whatsapp/fetchLastChatByPhone";
import { ContactsModelInterface } from "@/models/contacts";
import { MessagesModelInterface } from "@/models/messages";
import { NextResponse } from "next/server";

export interface CustomContactsCardDataInterface extends ContactsModelInterface {
    lastChat?: MessagesModelInterface,
}

export async function GET() {
    try {

        const contacts = await fetchAllContacts();
        const updatedContacts: CustomContactsCardDataInterface[] = []

        for (const contact of contacts) {
            const lastChat = await fetchLastChatByPhone({phone: contact.phone});
            const data: CustomContactsCardDataInterface = {
                name: contact.name,
                phone: contact.phone,
                assigned: contact.assigned,
                unread: contact.unread,
                lastChat,
            }

            updatedContacts.push(data);
        }

        return NextResponse.json(updatedContacts);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}