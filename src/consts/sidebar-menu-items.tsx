import ICONS from "@/consts/icons"

const SIDEBAR_MENU_ITEMS = [
    {
        icon: <ICONS.MEETING />,
        label: "Các cuộc họp",
        href: "/"
    },
    {
        icon: <ICONS.AGENT />,
        label: "Các agents",
        href: "/agents"
    }
] as const

export default SIDEBAR_MENU_ITEMS