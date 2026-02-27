"use client"

import useSignUpForm from "@/app/(auth)/sign-up/useSignUpForm";

import Link from "next/link";
import Button from "@/components/Button";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignUpForm() {
    const { form, sendOTPMutation, signUpMutation } = useSignUpForm();

    const handleSubmit = () => signUpMutation.mutate();
    const handleClickSendOTP = () => sendOTPMutation.mutate();

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                className="space-y-[20px]"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Tên người dùng</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Nhập tên người dùng..."
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
                                        onClick={handleClickSendOTP}
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
                    action="add"
                    className="w-full"
                    disabled={signUpMutation.isPending}
                >
                    Đăng ký
                </Button>
            </form>
        </Form>
    )
}