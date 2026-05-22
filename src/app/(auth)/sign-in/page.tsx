import Header from "@/components/core/header"
import SignInForm from "@/app/(auth)/sign-in/_components/form"

export default function Page() {
    return (
        <>
            <Header className="text-center">
                <h1 className="header text-center">Đăng nhập</h1>
                <p className="desc text-center">Chào mừng bạn quay trở lại <b className="text-orange-600 font-medium">Meetv</b>. Vui lòng đăng nhập để tiếp tục.</p>
            </Header>

            <SignInForm />
        </>
    )
}
