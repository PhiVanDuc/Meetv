export default [
    {
        label: "Miễn phí",
        description: "Giải pháp hoàn hảo để làm quen và thử nghiệm các tính năng cốt lõi",
        price: 0,
        priceId: "free",
        features: {
            maxAgents: 2,
            maxMeetings: 10,
            durationPerMeeting: 5 * 60 * 1000
        },
        labelFeatures: [
            "Cho phép tạo tối đa 2 agent",
            "Cho phép tạo tối đa 10 cuộc họp",
            "Giới hạn 5 phút / cuộc họp"
        ],
        recurringPayment: "",
        isRecommend: false,
        isFree: true
    },
    {
        label: "Tiêu chuẩn",
        description: "Cung cấp đầy đủ tính năng cần thiết để cá nhân và đội ngũ nhỏ phát triển ổn định",
        price: 499000,
        priceId: "price_1TMLGMRqc0zyfSPQ2Gl2Goh9",
        features: {
            maxAgents: 10,
            maxMeetings: 50,
            durationPerMeeting: 30 * 60 * 1000
        },
        labelFeatures: [
            "Cho phép tạo tối đa 10 agent",
            "Cho phép tạo tối đa 50 cuộc họp",
            "Giới hạn 30 phút / cuộc họp"
        ],
        recurringPayment: "Tháng",
        isRecommend: true,
        isFree: false
    },
    {
        label: "Nâng cao",
        description: "Dành cho chuyên gia, tổ chức hoặc người dùng có nhu cầu cao",
        price: 1499000,
        priceId: "price_1TMLJERqc0zyfSPQ57qmXCY4",
        features: {
            maxAgents: Infinity,
            maxMeetings: Infinity,
            durationPerMeeting: 120 * 60 * 1000
        },
        labelFeatures: [
            "Không giới hạn agent",
            "Không giới hạn cuộc họp",
            "Giới hạn 120 phút / cuộc họp"
        ],
        recurringPayment: "Tháng",
        isRecommend: false,
        isFree: false
    }
] as const;