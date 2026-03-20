import { z } from "zod";

export const schemaSignUp = z.object({
    name: z
        .string({ error: "Tên người dùng cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Tên người dùng không thể để trống." })
        .max(100, { error: "Tên người dùng không thể vượt quá 100 ký tự." }),
    email: z
        .email({ error: "Email sai định dạng." }),
    otp: z
        .string({ error: "Mã OTP cần phải là chuỗi." })
        .trim()
        .regex(/^\d{6}$/, { error: "Mã OTP sai định dạng." }),
    password: z
        .string({ error: "Mật khẩu cần phải là chuỗi." })
        .trim()
        .min(8, { error: "Mật khẩu không thể ít hơn 8 ký tự." })
        .max(100, { error: "Mật khẩu không thể vượt quá 100 ký tự." })
})

export type FormDataSignUp = z.infer<typeof schemaSignUp>;