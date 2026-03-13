import Header from "@/components/header";
import SignInForm from "@/app/(auth)/sign-in/form";

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="medium-header text-center">Đăng nhập</h1>
                <p className="medium-desc text-center">Chào mừng bạn quay trở lại <span className="text-brand-primary font-medium">Meetv</span>. Vui lòng đăng nhập để tiếp tục.</p>
            </Header>

            <SignInForm />
        </>
    )
}