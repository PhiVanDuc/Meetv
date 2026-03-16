"use client"

import useSignUpForm from "@/app/(auth)/sign-up/use-form";

import Link from "next/link";
import { ButtonAction } from "@/components/button";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";

export default function SignUpForm() {
    const { form, sendOTPMutation, signUpMutation } = useSignUpForm();

    const handleSubmit = () => signUpMutation.mutate();
    const handleSendOTP = () => sendOTPMutation.mutate();

    return (
        <form
            autoComplete="off"
            className="space-y-[15px]"
            onSubmit={form.handleSubmit(handleSubmit)}
        >
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Tên người dùng</FieldLabel>

                                <Input
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Nhập tên người dùng . . ."
                                />

                                { fieldState.invalid && <FieldError errors={[fieldState.error]} /> }
                            </Field>
                        )
                    }}
                />

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

                                    <ButtonAction
                                        iconDefault="send"
                                        onClick={handleSendOTP}
                                        className="whitespace-nowrap"
                                        isPending={sendOTPMutation.isPending}
                                    >
                                        Mã OTP
                                    </ButtonAction>
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

                <ButtonAction
                    iconDefault="add"
                    className="w-full"
                    isPending={signUpMutation.isPending}
                >
                    Đăng ký
                </ButtonAction>
            </FieldGroup>
        </form>
    )
}