import Header from "@/components/Header";
import ResetPasswordForm from "@/app/(auth)/forgot-password/ResetPasswordForm";

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="medium-header text-center">Đặt lại mật khẩu</h1>
                <p className="medium-desc text-center">Vui lòng nhập đầy đủ thông tin để hoàn tất quá trình đặt lại mật khẩu.</p>
            </Header>

            <ResetPasswordForm />
        </>
    )
}
