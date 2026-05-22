"use client"

import useSignInForm from "@/app/(auth)/sign-in/_hooks/use-form"

import Link from "next/link"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field"

import ICONS from "@/consts/icons"

export default function SignInForm() {
    const {form, handleSignIn, handleSignInOAuth, signInMutation} = useSignInForm()

    return (
        <form
            autoComplete="off"
            className="space-y-[15px]"
            onSubmit={form.handleSubmit(handleSignIn)}
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
                        href="/forgot-password"
                        className="link"
                    >
                        Quên mật khẩu
                    </Link>
                </div>

                <div className="space-y-[10px]">
                    <Button
                        className="w-full"
                        disabled={signInMutation.isPending}
                    >
                        {
                            signInMutation.isPending
                                ? <Spinner />
                                : <ICONS.SEND />
                        }

                        <span>Đăng nhập</span>
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleSignInOAuth}
                        className="w-full text-zinc-500 hover:text-zinc-600"
                    >
                        <ICONS.GOOGLE />
                        <span>Đăng nhập Google</span>
                    </Button>
                </div>
            </div>

            <p className="pt-[10px] text-center medium-desc">
                <span>Bạn chưa có tài khoản?</span>
                {" "}
                
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
