"use client"

import useSignInForm from "@/app/(auth)/sign-in/use-form";

import Link from "next/link";
import Button from "@/components/button";

import { FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignInForm() {
    const { form, mutation, signInGoogle } = useSignInForm();

    const handleSubmit = () => mutation.mutate();

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                className="space-y-[20px]"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Nhập email..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>

                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

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
                        action="send"
                        className="w-full"
                        disabled={mutation.isPending}
                    >
                        Đăng nhập
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={signInGoogle}
                        className="w-full text-zinc-500 hover:text-zinc-600"
                    >
                        <FaGoogle />
                        Đăng nhập Google
                    </Button>
                </div>

                <p className="text-center medium-desc">
                    Bạn chưa có tài khoản?
                    {" "}

                    <Link
                        href="/sign-up"
                        className="link"
                    >
                        Đăng ký
                    </Link>
                </p>
            </form>
        </Form>
    )
}