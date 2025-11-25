import ContactsModel from "@/models/contacts";

export async function createNewContact({
    name,
    phone,
}: {
    phone: string,
    name: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const contactExist = await ContactsModel.findOne({ phone });

            if (contactExist) {
                return resolve();
            }

            const newContact = new ContactsModel({
                phone,
                name,
            });

            await newContact.save();

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}