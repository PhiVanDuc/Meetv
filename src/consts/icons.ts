import { BiVideo } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { PiTrashSimpleBold } from "react-icons/pi";
import { IoIosSend, IoMdCard } from "react-icons/io";
import { IoReloadOutline, IoFilter } from "react-icons/io5";
import { SearchIcon, PanelLeftClose, PanelLeftIcon, StarIcon, LogOut, EllipsisVertical, CornerDownRight, Check, X, ListFilter } from "lucide-react";

export default {
    ADD: FaPlus,
    BILL: IoMdCard,
    SEND: IoIosSend,
    MEETING: BiVideo,
    FILTER: IoFilter,
    GOOGLE: FaGoogle,
    AGENT: RiRobot2Line,
    UPDATE: IoReloadOutline,
    DELETE: PiTrashSimpleBold,
    CLOSE: X,
    STAR: StarIcon,
    CONFIRM: Check,
    LOG_OUT: LogOut,
    SEARCH: SearchIcon,
    ENTER: CornerDownRight,
    EXPAND_PANEL: PanelLeftIcon,
    COLLAPSE_PANEL: PanelLeftClose,
    VERTICAL_DOTS: EllipsisVertical,
} as const;