import Header from "@/components/header";
import SignUpForm from "@/app/(auth)/sign-up/form";

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="medium-header text-center">Đăng ký tài khoản</h1>
                <p className="medium-desc text-center">Chào mừng bạn đến với <span className="text-brand-primary font-medium">Meetv</span>. Vui lòng đăng ký tài khoản để bắt đầu.</p>
            </Header>

            <SignUpForm />
        </>
    )
}
