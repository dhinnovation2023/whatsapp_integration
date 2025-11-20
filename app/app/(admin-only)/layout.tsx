import ErrorTemplate from "@/components/ui-elements/error-template";
import { handleCatchBlock } from "@/functions/common";
import DashboardLayout from "@/layouts/dashboard";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";

export default async function AdminOnlyPagesLayout({ children }: PropsWithChildren) {

    try {
        const session = await getServerSession();
        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in .env");
        }

        if (session?.user?.email !== SUPER_ADMIN_EMAIL) {
            throw new Error("You are not authorized to access here.")
        }

    } catch (err) {
        const message = handleCatchBlock(err);
        return (
            <DashboardLayout
                pageTitle="Only Super Admin"
            >
                <ErrorTemplate
                    error={message}
                />
            </DashboardLayout>
        )
    }

    return (
        <>
            {children}
        </>
    )
}