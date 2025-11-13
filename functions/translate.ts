import { v2 } from "@google-cloud/translate";
import { GenerateGoogleAuth } from "./google-auth";

export async function translateLanguage (text: string, languageCode: string) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;

            if (!GOOGLE_CLOUD_PROJECT_ID) {
                throw new Error("Please provide GOOGLE_CLOUD_PROJECT_ID in .env file.");
            }

            const GoogleAuth = await GenerateGoogleAuth();

            const translator = new v2.Translate({
                projectId: GOOGLE_CLOUD_PROJECT_ID,
                // eslint-disable-next-line
                authClient: GoogleAuth as any,
            });

            const [translation] = await translator.translate(text, languageCode);

            return resolve(translation);

        } catch (err) {
            return reject(err);
        }
    })
}