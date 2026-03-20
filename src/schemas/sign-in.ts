import z from "zod";

export const schemaSignIn = z.object({
    email: z
        .email({ error: "Email sai định dạng." }),
    password: z
        .string({ error: "Mật khẩu cần phải là chuỗi." })
        .trim()
        .min(1, { error: "Mật khẩu không thể để trống." })
        .max(100, { error: "Mật khẩu không thể vượt quá 100 ký tự." })
});

export type FormDataSignIn = z.infer<typeof schemaSignIn>;