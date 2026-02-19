import z from "zod";

const verifyEmailValidator = z.object({
    email: z
        .email({ error: "Email không đúng định dạng." }),
    otp: z
        .string()
        .trim()
        .length(6, { error: "Mã OTP cần đúng 6 ký tự." })
        .regex(/^\d+$/, { error: "Mã OTP chỉ được chứa số." })
});

type VerifyEmailFormData = z.infer<typeof verifyEmailValidator>

export default verifyEmailValidator;
export type { VerifyEmailFormData }