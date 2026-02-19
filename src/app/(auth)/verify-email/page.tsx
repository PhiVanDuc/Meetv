import Header from "@/components/Header";
import VerifyEmailForm from "@/app/(auth)/verify-email/VerifyEmailForm";

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="medium-header text-center">Xác minh email</h1>
                <p className="medium-desc text-center">Vui lòng nhập đầy đủ thông tin để hoàn tất quá trình xác minh email.</p>
            </Header>

            <VerifyEmailForm />
        </>
    )
}