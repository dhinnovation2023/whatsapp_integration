import { AuthClient, GoogleAuth } from "google-auth-library";

export async function GenerateGoogleAuth() {
    return new Promise<GoogleAuth<AuthClient>>(async (resolve, reject) => {
        try {

            const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

            if (!GOOGLE_CLOUD_API_KEY) {
                throw new Error("Please provide GOOGLE_CLOUD_API_KEY in .env file.");
            }

            const auth = new GoogleAuth({
                apiKey: GOOGLE_CLOUD_API_KEY,
                scopes: [
                    'https://www.googleapis.com/auth/spreadsheets',
                    'https://www.googleapis.com/auth/drive.file',
                ],
            })

            return resolve(auth)

        } catch (err) {
            return reject(err);
        }
    })
}