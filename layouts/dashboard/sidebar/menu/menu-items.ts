import { RemixiconComponentType, RiFileChartFill, RiFlagFill, RiGoogleFill, RiGroupFill, RiMailFill } from "@remixicon/react"

const menuItems: {
    label: string,
    href: string,
    icon: RemixiconComponentType,
}[] = [
    {
        label: "Inbox",
        href: "/app",
        icon: RiMailFill,
    },
    {
        label: "Teams",
        href: "/app/teams",
        icon: RiGroupFill,
    },
    {
        label: "Status Settings",
        href: "/app/status-settings",
        icon: RiFlagFill,
    },
    {
        label: "Generate Reports",
        href: "/app/generate-reports",
        icon: RiFileChartFill,
    },
    {
        label: "Google OAuth",
        href: "/app/google-oauth",
        icon: RiGoogleFill,
    }
]

export default menuItems