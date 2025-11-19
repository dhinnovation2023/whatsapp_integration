import { generateAuthUrl } from "@/functions/google-auth/googleOAuth"
import { redirect } from "next/navigation"

const page = async () => {

    const OAUthUrl = generateAuthUrl({
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ]
    })

    redirect(OAUthUrl);

}

export default page