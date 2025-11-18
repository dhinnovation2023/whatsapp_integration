import { RemixiconComponentType, RiFileChartFill, RiFlagFill, RiGroupFill, RiMailFill } from "@remixicon/react"

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
    }
]

export default menuItems