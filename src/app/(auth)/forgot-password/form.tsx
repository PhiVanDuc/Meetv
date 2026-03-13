"use client"

import useForgotPasswordForm from "@/app/(auth)/forgot-password/use-form";

import Link from "next/link";
import Button from "@/components/button";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function ForgotPasswordForm() {
    const { form, sendOTPMutation, forgotPasswordMutation } = useForgotPasswordForm();

    const handleSendOTP = () => sendOTPMutation.mutate();
    const handleSubmit = () => forgotPasswordMutation.mutate();

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
                                        onClick={handleSendOTP}
                                        className="whitespace-nowrap"
                                        disabled={sendOTPMutation.isPending}
                                    >
                                        Gửi mã OTP
                                    </Button>
                                </div>
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

                <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Xác nhận mật khẩu</FormLabel>

                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập mật khẩu xác nhận..."
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
                        href="/sign-in"
                        className="link"
                    >
                        Đăng nhập
                    </Link>
                </div>

                <Button
                    action="update"
                    className="w-full"
                    disabled={forgotPasswordMutation.isPending}
                >
                    Khôi phục mật khẩu
                </Button>
            </form>
        </Form>
    )
}