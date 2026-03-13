import Link from "next/link";
import Button from "@/components/button";

export default function Page() {
    return (
        <div className="p-[20px]">
            <Button>
                <Link href="/sign-in">Đăng nhập</Link>
            </Button>
        </div>
    )
}