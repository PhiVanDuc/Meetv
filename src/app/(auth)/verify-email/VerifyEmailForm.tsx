"use client"

import { useForm } from "react-hook-form";

import Link from "next/link";
import Button from "@/components/Button";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import verifyEmailValidator from "@/validators/verify-email-validator";

import type { VerifyEmailFormData } from "@/validators/verify-email-validator";

export default function VerifyEmailForm() {
    const form = useForm<VerifyEmailFormData>({
        resolver: zodResolver(verifyEmailValidator),
        defaultValues: {
            otp: ""
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
                    name="otp"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Mã xác nhận (OTP)</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập mã OTP..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <Button
                                        type="button"
                                        action="send"
                                        className="whitespace-nowrap"
                                    >
                                        Gửi mã OTP
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <div className="flex justify-end">
                    <Link
                        href="/sign-in"
                        className="link"
                    >
                        Đăng nhập
                    </Link>
                </div>

                <Button
                    action="verify"
                    className="w-full"
                >
                    Xác minh email
                </Button>
            </form>
        </Form>
    )
}