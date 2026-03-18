import { ICONS } from "@/consts"

export const FIRST_DASHBOARD_SIDEBAR_SECTION = [
    {
        icon: ICONS.MEETING,
        label: "Các cuộc họp",
        href: "/meetings"
    },
    {
        icon: ICONS.AGENT,
        label: "Các agent",
        href: "/agents"
    }
] as const;

export const SECOND_DASHBOARD_SIDEBAR_SECTION = [
    {
        icon: ICONS.STAR,
        label: "Nâng cấp",
        href: "/upgrade"
    }
] as const;