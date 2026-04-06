import ICONS from "@/consts/icons";

export default {
    "upcoming": {
        label: "Sắp diễn ra",
        value: "upcoming",
        textColor: "#42526E",
        backgroundColor: "#E9EEF6",
        icon: ICONS.CLOCK
        
    },
    "happening": {
        label: "Đang diễn ra",
        value: "happening",
        textColor: "#7C3AED",
        backgroundColor: "#F5F3FF",
        icon: ICONS.PLAY
    },
    "processing": {
        label: "Đang xử lý",
        value: "processing",
        textColor: "#B76E00",
        backgroundColor: "#FFF4D6",
        icon: ICONS.UPDATE
    },
    "completed": {
        label: "Đã hoàn thành",
        value: "completed",
        textColor: "#00875A",
        backgroundColor: "#E3FCEF",
        icon: ICONS.COMPLETED
    }
} as const;