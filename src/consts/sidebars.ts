import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

export const FIRST_DASHBOARD_SIDEBAR_SECTION = [
    {
        icon: VideoIcon,
        label: "Cuộc họp",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agent",
        href: "/agents"
    }
] as const;

export const SECOND_DASHBOARD_SIDEBAR_SECTION = [
    {
        icon: StarIcon,
        label: "Nâng cấp",
        href: "/upgrade"
    }
] as const;