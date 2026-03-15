import { z } from "zod";

export const schemaForgotPassword = z.object({
    email: z
        .email({ error: "Email sai định dạng." }),
    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/, { error: "Mã OTP sai định dạng." }),
    password: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu không thể ít hơn 8 ký tự." })
        .max(100, { error: "Mật khẩu không thể vượt quá 100 ký tự." })
})

export type FormDataForgotPassword = z.infer<typeof schemaForgotPassword>;