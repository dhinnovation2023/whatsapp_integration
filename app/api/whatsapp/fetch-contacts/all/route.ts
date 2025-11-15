import { handleCatchBlock } from "@/functions/common";
import { fetchAllContacts, FetchContactsFilterOptions } from "@/functions/whatsapp/fetchContacts";
import { fetchLastChatByPhone } from "@/functions/whatsapp/fetchLastChatByPhone";
import { ContactsModelInterface } from "@/models/contacts";
import { MessagesModelInterface } from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

export interface CustomContactsCardDataInterface extends ContactsModelInterface {
    lastChat?: MessagesModelInterface,
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as FetchContactsFilterOptions;

        const contacts = await fetchAllContacts(body);
        const updatedContacts: CustomContactsCardDataInterface[] = [];

        for (const contact of contacts) {
            const lastChat = await fetchLastChatByPhone({phone: contact.phone});
            const data: CustomContactsCardDataInterface = {
                name: contact.name,
                phone: contact.phone,
                assigned: contact.assigned,
                unread: contact.unread,
                lastChat,
                statusId: contact.statusId,
            }

            updatedContacts.push(data);
        }

        return NextResponse.json(updatedContacts);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}