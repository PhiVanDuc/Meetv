"use client"

import useSignInForm from "@/app/(auth)/sign-in/use-form";

import Link from "next/link";
import { ButtonAction } from "@/components/button";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";

import { FaGoogle } from "react-icons/fa";

export default function SignInForm() {
    const { form, mutation, redirectOAuth } = useSignInForm();

    const handleSubmit = () => mutation.mutate();

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
                        href="/forgot-password"
                        className="link"
                    >
                        Quên mật khẩu
                    </Link>
                </div>

                <div className="space-y-[10px]">
                    <ButtonAction
                        className="w-full"
                        iconDefault="send"
                        isPending={mutation.isPending}
                    >
                        Đăng nhập
                    </ButtonAction>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={redirectOAuth}
                        className="w-full text-zinc-500 hover:text-zinc-600"
                    >
                        <FaGoogle />
                        Đăng nhập Google
                    </Button>
                </div>
            </FieldGroup>

            <p className="text-center medium-desc pt-[10px]">
                Bạn chưa có tài khoản? {" "}

                <Link
                    href="/sign-up"
                    className="link"
                >
                    Đăng ký
                </Link>
            </p>
        </form>
    )
}