"use client"

import useForgotPasswordForm from "@/app/(auth)/forgot-password/_hooks/use-form"

import Link from "next/link"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"

import ICONS from "@/consts/icons"

export default function ForgotPasswordForm() {
    const {form, handleSendOtp, handleForgotPassword, sendOtpMutation, forgotPasswordMutation} = useForgotPasswordForm()

    return (
        <form
            autoComplete="off"
            className="space-y-[15px]"
            onSubmit={form.handleSubmit(handleForgotPassword)}
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

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

                                <div className="flex items-center gap-[5px]">
                                    <Input
                                        {...field}
                                        placeholder="Nhập mã OTP . . ."
                                        aria-invalid={fieldState.invalid}
                                    />

                                    <Button
                                        type="button"
                                        onClick={handleSendOtp}
                                        className="whitespace-nowrap"
                                        disabled={sendOtpMutation.isPending}
                                    >
                                        {
                                            sendOtpMutation.isPending
                                                ? <Spinner />
                                                : <ICONS.SEND />
                                        }

                                        <span>Mã OTP</span>
                                    </Button>
                                </div>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )
                    }}
                />
            </FieldGroup>

            <div className="space-y-[15px]">
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
                    {
                        forgotPasswordMutation.isPending
                            ? <Spinner />
                            : <ICONS.CHANGE />
                    }

                    <span>Khôi phục mật khẩu</span>
                </Button>
            </div>
        </form>
    )
}
