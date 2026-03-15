import z from "zod";

export const schemaSignIn = z.object({
    email: z
        .email({ error: "Email sai định dạng." }),
    password: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu không thể ít hơn 8 ký tự." })
        .max(100, { error: "Mật khẩu không thể vượt quá 100 ký tự." })
});

export type FormDataSignIn = z.infer<typeof schemaSignIn>;