import { BiVideo } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { RiRobot2Line } from "react-icons/ri";
import { IoReloadOutline } from "react-icons/io5";
import { PiTrashSimpleBold } from "react-icons/pi";
import { IoIosSend, IoMdCard } from "react-icons/io";
import { SearchIcon, PanelLeftClose, PanelLeftIcon, StarIcon, LogOut, EllipsisVertical, CornerDownRight } from "lucide-react";

export default {
    ADD: FaPlus,
    BILL: IoMdCard,
    SEND: IoIosSend,
    MEETING: BiVideo,
    AGENT: RiRobot2Line,
    UPDATE: IoReloadOutline,
    DELETE: PiTrashSimpleBold,
    STAR: StarIcon,
    LOG_OUT: LogOut,
    SEARCH: SearchIcon,
    ENTER: CornerDownRight,
    EXPAND_PANEL: PanelLeftIcon,
    COLLAPSE_PANEL: PanelLeftClose,
    VERTICAL_DOTS: EllipsisVertical,
} as const;