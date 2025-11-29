import { RemixiconComponentType, RiFileChartFill, RiFlagFill, RiGoogleFill, RiGroupFill, RiMailFill, RiShieldCheckFill, RiWrenchFill } from "@remixicon/react"

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
    {
        label: "Generate Reports",
        href: "/app/generate-reports",
        icon: RiFileChartFill,
    },
    "Others Use Cases",
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
    {
        label: "Service",
        href: "#",
        icon: RiWrenchFill,
        submenu: [
            {
                label: "View All",
                href: "/app/service-cert",
            },
            {
                label: "Add New",
                href: "/app/service-cert/add",
            },
            {
                label: "View Brands",
                href: "/app/service-cert/brands",
            },
            {
                label: "Add Brand",
                href: "/app/service-cert/brands/add",
            }
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