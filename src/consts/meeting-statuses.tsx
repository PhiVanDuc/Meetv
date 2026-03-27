import ICONS from "@/consts/icons";

export default {
    "upcoming": {
        textColor: "#42526E",
        icon: ICONS.CLOCK,
        backgroundColor: "#E9EEF6",
        label: "Sắp diễn ra"
    },
    "active": {
        icon: ICONS.MEETING,
        textColor: "#0052CC",
        backgroundColor: "#DEEBFF",
        label: "Đang diễn ra"
    },
    "completed": {
        icon: ICONS.COMPLETED,
        textColor: "#00875A",
        backgroundColor: "#E3FCEF",
        label: "Đã hoàn thành"
    },
    "processing": {
        icon: ICONS.UPDATE,
        textColor: "#B76E00",
        backgroundColor: "#FFF4D6",
        label: "Đang xử lý"
    },
    "cancelled": {
        icon: ICONS.CLOSE,
        textColor: "#DE350B",
        backgroundColor: "#FFEBE6",
        label: "Đã huỷ"
    }
} as const;