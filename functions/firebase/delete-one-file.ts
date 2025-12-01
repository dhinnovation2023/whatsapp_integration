import { bucket } from "@/config/firebase";

export async function deleteOneFirebaseUpload(pathname: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const targetFile = bucket.file(pathname);
            const [exist] = await targetFile.exists();

            if (exist) {
                await targetFile.delete();
            }

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}