import { z } from "zod";

export const schemaMeeting = z.object({
    name: z
        .string({ error: "Tên agent cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Tên agent không thể để trống." }),
    agentId: z
        .uuid({ error: "Agent không thể để trống." })
})

export type FormDataMeeting = z.infer<typeof schemaMeeting>;