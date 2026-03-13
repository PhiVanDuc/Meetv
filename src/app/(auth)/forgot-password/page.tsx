import Header from "@/components/header";
import ForgotPasswordForm from "@/app/(auth)/forgot-password/form";

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="medium-header text-center">Khôi phục mật khẩu</h1>
                <p className="medium-desc text-center">Vui lòng nhập đầy đủ thông tin để hoàn tất quá trình khôi phục mật khẩu.</p>
            </Header>

            <ForgotPasswordForm />
        </>
    )
}
