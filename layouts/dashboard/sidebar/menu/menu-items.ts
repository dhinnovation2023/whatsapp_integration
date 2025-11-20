import { RemixiconComponentType, RiFileChartFill, RiFlagFill, RiGoogleFill, RiGroupFill, RiMailFill, RiShieldCheckFill } from "@remixicon/react"

export interface DashboardMenuItemsInterface {
    label: string,
    href: string,
    icon: RemixiconComponentType,
    submenu?: {
        label: string,
        href: string,
    }[]
}

const menuItems: DashboardMenuItemsInterface[] = [
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
    },
    {
        label: "Warranty",
        href: "#",
        icon: RiShieldCheckFill,
        submenu: [
            {
                label: "View All",
                href: "/app/warranty-cert",
            },
            {
                label: "Add New",
                href: "/app/warranty-cert/add",
            },
            {
                label: "Brands",
                href: "#",
            },
        ]
    }
]

export default menuItems