import { RemixiconComponentType, RiBox2Fill, RiCheckboxCircleFill, RiFileChartFill, RiFlagFill, RiGoogleFill, RiGroupFill, RiMailFill, RiMessage3Fill, RiShieldCheckFill, RiWrenchFill } from "@remixicon/react"

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
    {
        label: "Completion",
        href: "#",
        icon: RiCheckboxCircleFill,
        submenu: [
            {
                label: "View All",
                href: "/app/completion-cert",
            },
            {
                label: "Add New",
                href: "/app/completion-cert/add",
            },
            {
                label: "View Brands",
                href: "/app/completion-cert/brands",
            },
            {
                label: "Add Brand",
                href: "/app/completion-cert/brands/add",
            }
        ]
    },
    "Google",
    {
        label: "Google OAuth",
        href: "/app/google-oauth",
        icon: RiGoogleFill,
    },
    "Accounting",
    {
        label: "Products",
        href: "#",
        icon: RiBox2Fill,
        submenu: [
            {
                label: "View All",
                href: "/app/accounting/products",
            },
            {
                label: "Add New",
                href: "/app/accounting/products/add"
            },
        ]
    },
    {
        label: "Quotation",
        href: "#",
        icon: RiMessage3Fill,
        submenu: [
            {
                label: "View All",
                href: "/app/accounting/quotations",
            },
            {
                label: "Add New",
                href: "/app/accounting/quotations/add",
            }
        ],
    }
]

export default menuItems