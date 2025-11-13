import { CustomContactsCardDataInterface } from "@/app/api/whatsapp/fetch-contacts/all/route";
import { FetchContactsFilterOptions } from "@/functions/whatsapp/fetchContacts";
import axios from "axios";

export async function fetchFilteredContacts (options: FetchContactsFilterOptions) {
    return new Promise<CustomContactsCardDataInterface[]>(async (resolve, reject) => {
        try {

            const {
                data: contacts,
            } = await axios.post<CustomContactsCardDataInterface[]>(
                '/api/whatsapp/fetch-contacts/all',
                options,
            );
            console.log(contacts);
            return resolve(contacts);

        } catch (err) {
            return reject(err);
        }
    })
}