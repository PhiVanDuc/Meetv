import Header from "@/components/core/header"
import ForgotPasswordForm from "@/app/(auth)/forgot-password/_components/form"

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="header text-center">Khôi phục mật khẩu</h1>
                <p className="desc text-center">Vui lòng nhập đầy đủ thông tin để hoàn tất quá trình khôi phục mật khẩu.</p>
            </Header>

            <ForgotPasswordForm />
        </>
    )
}