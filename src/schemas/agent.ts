import { z } from "zod";

export const schemaAgent = z.object({
    name: z
        .string({ error: "Tên agent cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Tên agent không thể để trống." })
        .max(100, { error: "Tên agent không thể vượt quá 100 ký tự." }),
    instructions: z
        .string({ error: "Chỉ dẫn agent cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Chỉ dẫn agent không thể để trống." })
        .max(2000, { error: "Chỉ dẫn agent không thể vượt quá 2000 ký tự." })
})

export type FormDataAgent = z.infer<typeof schemaAgent>;