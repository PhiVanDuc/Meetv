import { z } from "zod";

const resetPasswordValidator = z.object({
    email: z
        .email({ error: "Email không đúng định dạng." }),
    otp: z
        .string()
        .trim()
        .length(6, { error: "Mã OTP cần đúng 6 ký tự." })
        .regex(/^\d+$/, { error: "Mã OTP chỉ được chứa số." }),
    password: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu tối thiểu 8 ký tự." })
        .max(64, { error: "Mật khẩu tối đa 64 ký tự." }),
    passwordConfirmation: z
        .string()
        .trim()
        .min(8, { error: "Mật khẩu xác nhận tối thiểu 8 ký tự." })
        .max(64, { error: "Mật khẩu xác nhận tối đa 64 ký tự." })
})
    .refine(data => data.password === data.passwordConfirmation, {
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp."
    });

type ResetPasswordFormData = z.infer<typeof resetPasswordValidator>;

export default resetPasswordValidator;
export type { ResetPasswordFormData };