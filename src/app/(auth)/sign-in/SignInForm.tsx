"use client"

import { useForm } from "react-hook-form";

import Link from "next/link";
import Button from "@/components/Button";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { FaGoogle } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import signInValidator from "@/validators/sign-in-validator";

import type { SignInFormData } from "@/validators/sign-in-validator";

export default function SignInForm() {

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInValidator),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                className="space-y-[20px]"
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

                <div className="flex justify-between">
                    <Link
                        href="/verify-email"
                        className="link"
                    >
                        Xác minh email
                    </Link>

                    <Link
                        href="/forgot-password"
                        className="link"
                    >
                        Quên mật khẩu
                    </Link>
                </div>

                <div className="flex gap-[10px]">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-[50%] text-zinc-500 hover:text-zinc-600"
                    >
                        <FaGoogle />
                        Đăng nhập Google
                    </Button>

                    <Button
                        action="send"
                        className="w-[50%]"
                    >
                        Đăng nhập
                    </Button>
                </div>

                <p className="text-center medium-desc">Bạn chưa có tài khoản? <Link href="/sign-up" className="link">Đăng ký</Link></p>
            </form>
        </Form>
    )
}