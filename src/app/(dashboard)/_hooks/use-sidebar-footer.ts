import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

import { toast } from "@pheralb/toast";
import { removeAuthTokens } from "@/services/auth/server-actions";

export default function useDashboardSidebarFooter() {
    const router = useRouter();
    const isMobile = useIsMobile();

    const handleSignOut = async () => {
        await removeAuthTokens();
        
        router.push("/sign-in");
        toast.success({ text: "Thành công", description: "Đăng xuất thành công." });
    }

    return { isMobile, handleSignOut }
}
