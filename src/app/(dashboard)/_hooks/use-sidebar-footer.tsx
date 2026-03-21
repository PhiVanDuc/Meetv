import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

import { toast } from "@pheralb/toast";
import { clearSession } from "@/services/session/server-actions";

export default function useDashboardSidebarFooter() {
    const router = useRouter();
    const isMobile = useIsMobile();

    const handleSignOut = async () => {
        await clearSession();
        router.push("/sign-in");
        toast.success({ text: "Thành công", description: "Đăng xuất thành công." });
    }

    return { isMobile, handleSignOut }
}
