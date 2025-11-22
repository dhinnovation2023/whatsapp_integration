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

const menuItems: (DashboardMenuItemsInterface | string)[] = [
    "WhatsApp",
    {
        label: "Inbox",
        href: "/app",
        icon: RiMailFill,
    },
    "WhatsApp Settings",
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
    "Others Use Cases",
    {
        label: "Generate Reports",
        href: "/app/generate-reports",
        icon: RiFileChartFill,
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
                href: "/app/warranty-cert/brands",
            },
            {
                label: "Add Brands",
                href: "/app/warranty-cert/brands/add",
            },
        ]
    },
    "Google",
    {
        label: "Google OAuth",
        href: "/app/google-oauth",
        icon: RiGoogleFill,
    },
]

export default menuItems