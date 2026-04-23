import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";
import UpgradePricingButton from "@/app/(dashboard)/upgrade/_components/pricing-button";
import UpgradePlanIndicator from "@/app/(dashboard)/upgrade/_components/plan-indicator";

import { cn } from "@/libs/utils";
import PLANS from "@/consts/plans";
import ICONS from "@/consts/icons";

export default function Page() {
    return (
        <div className="space-y-[50px] xl:space-y-[100px]">
            <Header>
                <h1 className="medium-header">Chọn gói đăng ký</h1>
                <p className="medium-desc">Nâng cấp tài khoản để mở khóa giới hạn Agents, cuộc họp và thời gian dài hơn.</p>
            </Header>

            <div className="space-y-[25px] xl:space-y-[50px]">
                <UpgradePlanIndicator />

                <ul className="flex flex-col items-center xl:flex-row xl:items-stretch justify-center gap-[25px] xl:gap-[15px]">
                    {
                        PLANS.map(plan => (
                            <li
                                key={plan.priceId}
                                className={cn(
                                    "relative w-full max-w-none xl:max-w-[450px] space-y-[30px] p-[25px] rounded-[10px]",
                                    plan.isRecommend
                                        ? "bg-linear-to-br from-brand-primary to-orange-600 text-white"
                                        : "border"
                                )}
                            >
                                {
                                    plan.isRecommend
                                        && <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-[20px] py-[5px] rounded-[10px] bg-white text-[13px] text-brand-primary font-semibold capitalize">Đề xuất cho bạn</p>
                                }

                                <div className="space-y-[10px]">
                                    <p
                                        className={cn(
                                            "text-[14px] font-bold capitalize",
                                            plan.isRecommend
                                                ? "text-white"
                                                : "text-brand-primary"
                                        )}
                                    >
                                        {plan.label}
                                    </p>

                                    <div className="flex items-center gap-[10px]">
                                        <span className="large-header">
                                            {
                                                new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })
                                                .format(plan.price)
                                            }
                                        </span>

                                        {
                                            plan.recurringPayment
                                                && (
                                                    <span
                                                        className={cn(
                                                            "whitespace-nowrap text-[14px] text-neutral-500 font-medium translate-y-[10px]",
                                                            plan.isRecommend
                                                                ? "text-white"
                                                                : "text-zinc-500"
                                                        )}
                                                    >
                                                        / {plan.recurringPayment}
                                                    </span>
                                                )
                                        }
                                    </div>

                                    <p
                                        className={cn(
                                            "text-[14px] md:text-[15px] text-zinc-500",
                                            plan.isRecommend
                                                ? "text-white"
                                                : "text-zinc-500"
                                        )}
                                    >
                                        {plan.description}
                                    </p>
                                </div>

                                <Separator className={cn(plan.isRecommend && "bg-white")} />

                                <div className="space-y-[20px]">
                                    <p className="font-semibold capitalize">Các chức năng</p>

                                    <ul className="space-y-[15px]">
                                        {
                                            plan.labelFeatures.map(labelFeature => (
                                                <li
                                                    key={labelFeature}
                                                    className="flex items-center gap-[10px]"
                                                >
                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-center size-[25px] rounded-full",
                                                            plan.isRecommend
                                                                ? "bg-white text-green-600"
                                                                : "bg-green-600/10 text-green-600"
                                                        )}
                                                    >
                                                        <ICONS.CONFIRM
                                                            size={15}
                                                            className="translate-y-px"
                                                        />
                                                    </div>

                                                    <p className="text-[14px] md:text-[15px]">{labelFeature}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    <UpgradePricingButton plan={plan} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}