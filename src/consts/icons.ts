import { FaPlus } from "react-icons/fa6";
import { BiVideo } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FaGoogle } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";
import { PiTrashSimpleBold } from "react-icons/pi";
import { IoIosSend, IoMdCard } from "react-icons/io";
import { SearchIcon, PanelLeftClose, PanelLeftIcon, StarIcon, LogOut, EllipsisVertical, CornerDownRight, Check, X, ChevronsUpDown, Play } from "lucide-react";

export default {
    ADD: FaPlus,
    BILL: IoMdCard,
    CLOCK: FiClock,
    SEND: IoIosSend,
    MEETING: BiVideo,
    GOOGLE: FaGoogle,
    UPDATE: TbReload,
    AGENT: RiRobot2Line,
    COMPLETED: BsCheckLg,
    DELETE: PiTrashSimpleBold,
    CLOSE: X,
    PLAY: Play,
    STAR: StarIcon,
    CONFIRM: Check,
    LOG_OUT: LogOut,
    SEARCH: SearchIcon,
    ENTER: CornerDownRight,
    SELECT: ChevronsUpDown,
    EXPAND_PANEL: PanelLeftIcon,
    COLLAPSE_PANEL: PanelLeftClose,
    VERTICAL_DOTS: EllipsisVertical
} as const;