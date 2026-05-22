import { FaPlus } from "react-icons/fa6"
import { BiVideo } from "react-icons/bi"
import { FiClock } from "react-icons/fi"
import { FaGoogle } from "react-icons/fa"
import { BsCheckLg } from "react-icons/bs"
import { CgTranscript } from "react-icons/cg"
import { RiRobot2Line } from "react-icons/ri"
import { TbReload, TbNotes } from "react-icons/tb"
import { PiTrashSimpleBold } from "react-icons/pi"
import { IoIosSend, IoMdCard } from "react-icons/io"
import { SearchIcon, PanelLeftClose, PanelLeftIcon, StarIcon, LogOut, EllipsisVertical, CornerDownRight, Check, X, ChevronsUpDown, Play, Rocket } from "lucide-react"

const ICONS = {
    ADD: FaPlus,
    NOTE: TbNotes,
    CARD: IoMdCard,
    CLOCK: FiClock,
    SEND: IoIosSend,
    MEETING: BiVideo,
    GOOGLE: FaGoogle,
    CHANGE: TbReload,
    AGENT: RiRobot2Line,
    COMPLETED: BsCheckLg,
    TRANSCRIPT: CgTranscript,
    DELETE: PiTrashSimpleBold,

    CLOSE: X,
    PLAY: Play,
    DONE: Check,
    STAR: StarIcon,
    ROCKET: Rocket,
    LOG_OUT: LogOut,
    SEARCH: SearchIcon,
    ENTER: CornerDownRight,
    EXPAND_PANEL: PanelLeftIcon,
    EXPAND_OPTIONS: ChevronsUpDown,
    COLLAPSE_PANEL: PanelLeftClose,
    VERTICAL_DOTS: EllipsisVertical
} as const

export default ICONS