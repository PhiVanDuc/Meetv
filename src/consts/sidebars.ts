import { StarIcon } from "lucide-react";

import { BiVideo } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";

export const FIRST_DASHBOARD_SIDEBAR_SECTION = [
    {
        icon: BiVideo,
        label: "Các cuộc họp",
        href: "/meetings"
    },
    {
        icon: RiRobot2Line,
        label: "Các agent",
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