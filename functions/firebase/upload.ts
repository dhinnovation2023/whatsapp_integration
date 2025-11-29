import { bucket } from "@/config/firebase";
import { v4 as uuid } from "uuid";

export async function uploadOneFile(data: {
    buffer: Buffer,
    mime_type: string,
    folders: string[],
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const filename = uuid();
            const filePathname = [...data.folders, filename].join('/');

            const file = bucket.file(filePathname);

            await file.save(
                data.buffer,
                {
                    metadata: {
                        contentType: data.mime_type,
                    }
                }
            )

            return resolve(filePathname);

        } catch (err) {
            return reject(err);
        }
    })
}