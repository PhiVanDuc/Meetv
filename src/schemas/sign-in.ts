import z from "zod";

export const schemaSignIn = z.object({
    email: z
        .email({ error: "Email không đúng định dạng." }),
    password: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu tối thiểu 8 ký tự." })
        .max(64, { error: "Mật khẩu tối đa 64 ký tự." })
});

export type FormDataSignIn = z.infer<typeof schemaSignIn>;