import ErrorTemplate from "@/components/ui-elements/error-template"
import { handleCatchBlock } from "@/functions/common"
import { generateAuthUrl } from "@/functions/google-auth/googleOAuth"
import DashboardLayout from "@/layouts/dashboard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {

    try {
        const session = await getServerSession();
        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in .env");
        }

        if (session?.user?.email !== SUPER_ADMIN_EMAIL) {
            throw new Error("you are not authorized to access here.")
        }

    } catch (err) {
        const message = handleCatchBlock(err);
        return (
            <DashboardLayout
                pageTitle="Google OAuth Page"
            >
                <ErrorTemplate
                    error={message}
                />
            </DashboardLayout>
        )
    }

    const OAUthUrl = generateAuthUrl({
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ]
    })

    redirect(OAUthUrl);

}

export default page