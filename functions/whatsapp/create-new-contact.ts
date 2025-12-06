import ContactsModel from "@/models/contacts";

export async function createNewContact({
    name,
    phone,
}: {
    phone: string,
    name: string,
}) {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const contactExist = await ContactsModel.findOne({ phone });

            if (contactExist) {
                return resolve(false);
            }

            const newContact = new ContactsModel({
                phone,
                name,
            });

            await newContact.save();

            return resolve(true);

        } catch (err) {
            return reject(err);
        }
    })
}