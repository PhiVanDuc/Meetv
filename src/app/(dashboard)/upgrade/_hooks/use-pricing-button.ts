import { useQuery } from "@tanstack/react-query";

import PLANS from "@/consts/plans";
import { getProfile } from "@/services/users/client-functions";

export default function useUpgradePricingButton(paramPlan: (typeof PLANS)[number]) {
    const query = useQuery({
        queryKey: ["getProfile"],
        queryFn: () => getProfile()
    });

    const plan = PLANS.find(plan => plan.priceId === query.data?.data?.subscription?.servicePriceId);

    const isFree = plan?.isFree;
    const isSubscribe = paramPlan.priceId === plan?.priceId;

    const detectLableButton = () => {
        if (isFree) {
            if (isSubscribe) return "Gói hiện tại";
            else return "Nâng cấp gói";
        } else {
            if (isSubscribe) return "Quản lý gói";
            else return "Chuyển gói";
        }
    }

    return {
        plan,
        isSubscribe,
        isPending: query.isPending,
        labelButton: detectLableButton(),
        isError: !query.isPending && query.isError
    }
}
