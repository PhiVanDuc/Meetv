"use client"

import Link from "next/link";

import { Spinner } from "@/components/ui/spinner";
import { Button as ShadcnButton } from "@/components/ui/button";

import { FiSearch } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { PiTrashSimpleBold } from "react-icons/pi";
import { IoReloadOutline, IoFilter } from "react-icons/io5";

import { cn } from "@/libs/utils";

interface Props extends React.ComponentPropsWithoutRef<typeof ShadcnButton> {
    href?: string,
    action?: "add" | "update" | "delete" | "verify" | "filter" | "send" | "sendEmail"
}

const icons = {
    add: <FaPlus />,
    update: <IoReloadOutline />,
    delete: <PiTrashSimpleBold />,
    verify: <FaCheck />,
    search: <FiSearch />,
    filter: <IoFilter />,
    send: <IoIosSend />,
    sendEmail: <HiOutlineMail />
};

export default function Button({ children, action, href, className, disabled, ...props }: Props) {
    const Icon = action ? icons[action] : null;

    const innerContent = (
        <>
            {
                disabled
                    ? <Spinner />
                    : Icon
            }
            {children}
        </>
    );

    return (
        <ShadcnButton
            className={className}
            disabled={disabled}
            asChild={!!href}
            {...props}
        >
            {
                href
                    ? <Link href={href}>{innerContent}</Link>
                    : innerContent
            }
        </ShadcnButton>
    )
}
