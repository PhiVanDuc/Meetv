"use client"

import useForgotPasswordForm from "@/app/(auth)/forgot-password/use-form";

import Link from "next/link";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";

import { ICONS } from "@/consts";

export default function ForgotPasswordForm() {
    const { form, sendOTPMutation, forgotPasswordMutation } = useForgotPasswordForm();

    const handleSendOTP = () => sendOTPMutation.mutate();
    const handleSubmit = () => forgotPasswordMutation.mutate();

    return (
        <form
            autoComplete="off"
            className="space-y-[15px]"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Email</FieldLabel>

                                <Input
                                    {...field}
                                    placeholder="Nhập email . . ."
                                    aria-invalid={fieldState.invalid}
                                />

                                { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                            </Field>
                        )
                    }}
                />

                <Controller
                    name="otp"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Mã OTP</FieldLabel>

                                <div className="flex items-center gap-[10px]">
                                    <Input
                                        {...field}
                                        placeholder="Nhập mã OTP . . ."
                                        aria-invalid={fieldState.invalid}
                                    />

                                    <Button
                                        type="button"
                                        onClick={handleSendOTP}
                                        className="whitespace-nowrap"
                                        disabled={sendOTPMutation.isPending}
                                    >
                                        { sendOTPMutation.isPending ? <Spinner /> : <ICONS.SEND /> }
                                        <span>Mã OTP</span>
                                    </Button>
                                </div>

                                { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                            </Field>
                        )
                    }}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Mật khẩu</FieldLabel>

                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="Nhập mật khẩu . . ."
                                    aria-invalid={fieldState.invalid}
                                />

                                { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                            </Field>
                        )
                    }}
                />
            </FieldGroup>

            <FieldGroup>
                <div className="flex justify-end">
                    <Link
                        href="/sign-in"
                        className="link"
                    >
                        Đăng nhập
                    </Link>
                </div>

                <Button
                    className="w-full"
                    disabled={forgotPasswordMutation.isPending}
                >
                    { forgotPasswordMutation.isPending ? <Spinner /> : <ICONS.UPDATE /> }
                    <span>Khôi phục</span>
                </Button>
            </FieldGroup>
        </form>
    )
}