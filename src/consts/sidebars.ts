import { StarIcon } from "lucide-react";

import { BiVideo } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";

export const FIRST_DASHBOARD_SIDEBAR_SECTION = [
    {
        icon: BiVideo,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: RiRobot2Line,
        label: "Agents",
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