import { z } from "zod";

export const schemaAgent = z.object({
    name: z
        .string({ error: "Tên agent cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Tên agent không thể để trống." }),
    instructions: z
        .string({ error: "Chỉ dẫn agent cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Chỉ dẫn agent không thể để trống." })
})

export type FormDataAgent = z.infer<typeof schemaAgent>;