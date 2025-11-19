import OptionsModel from "@/models/options";
import { Credentials, OAuth2Client } from "google-auth-library";

export function getGoogleOAuthClient() {

    const GOOGLE_CLOUD_OAUTH_CLIENT_ID = process.env.GOOGLE_CLOUD_OAUTH_CLIENT_ID;
    const GOOGLE_CLOUD_OAUTH_SECRET = process.env.GOOGLE_CLOUD_OAUTH_SECRET;
    const GOOGLE_CLOUD_OAUTH_REDIRECT_URL = process.env.GOOGLE_CLOUD_OAUTH_REDIRECT_URL;

    if (!GOOGLE_CLOUD_OAUTH_CLIENT_ID || !GOOGLE_CLOUD_OAUTH_SECRET || !GOOGLE_CLOUD_OAUTH_REDIRECT_URL) {
        throw new Error("please provider GOOGLE_CLOUD_OAUTH_CLIENT_ID, GOOGLE_CLOUD_OAUTH_SECRET, GOOGLE_CLOUD_OAUTH_REDIRECT_URL in .env");
    }

    return new OAuth2Client({
        client_id: GOOGLE_CLOUD_OAUTH_CLIENT_ID,
        client_secret: GOOGLE_CLOUD_OAUTH_SECRET,
        redirectUri: GOOGLE_CLOUD_OAUTH_REDIRECT_URL,
    })
}

export function generateAuthUrl({
    scopes,
}: {
    scopes: string[],
}) {
    const oauth2client = getGoogleOAuthClient();
    return oauth2client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    })
}

export async function getTokensFromCode(code: string) {
    const oauth2Client = getGoogleOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
}

export async function saveTokensToDB({ tokens }: {
    tokens: Credentials,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const stringifyTokens = JSON.stringify(tokens);
            const updatedToken = await OptionsModel.findOneAndUpdate(
                { name: "google-oauth" },
                {
                    $set: {
                        value: stringifyTokens,
                    }
                },
                { upsert: true, new: true }
            )

            if (!updatedToken) {
                throw new Error("Failed to save GoogleOAuth tokens to database");
            }

            return resolve()

        } catch (err) {
            return reject(err);
        }
    })
}