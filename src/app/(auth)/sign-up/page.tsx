import Header from "@/components/core/header"
import SignUpForm from "@/app/(auth)/sign-up/_components/form"

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="header text-center">Đăng ký tài khoản</h1>
                <p className="desc text-center">Chào mừng bạn đến với <b className="text-orange-600 font-medium">Meetv</b>. Vui lòng đăng ký tài khoản để bắt đầu.</p>
            </Header>

            <SignUpForm />
        </>
    )
}