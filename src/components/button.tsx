"use client";

import { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { Spinner } from "@/components/ui/spinner";
import { Button as ShadcnButton } from "@/components/ui/button";

import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { PiTrashSimpleBold } from "react-icons/pi";
import { IoReloadOutline } from "react-icons/io5";

const DEFAULT_ICONS = {
    add: FaPlus,
    update: IoReloadOutline,
    delete: PiTrashSimpleBold,
    send: IoIosSend
};

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<typeof ShadcnButton>, "asChild"> {
    href: string
}

interface ButtonActionProps extends Omit<ComponentPropsWithoutRef<typeof ShadcnButton>, "asChild"> {
    isPending?: boolean,
    iconDefault?: keyof typeof DEFAULT_ICONS,
    iconElement?: React.ElementType,
}

export function ButtonLink({ children, href, ...props }: ButtonLinkProps) {
    return (
        <ShadcnButton
            {...props}
            asChild
        >
            <Link href={href}>{children}</Link>
        </ShadcnButton>
    )
}

export function ButtonAction({ children, iconDefault, iconElement, disabled, isPending, ...props }: ButtonActionProps) {
    const Icon = iconElement || (iconDefault && DEFAULT_ICONS[iconDefault]);

    return (
        <ShadcnButton
            {...props}
            disabled={disabled || isPending}
        >
            {
                isPending
                    ? <Spinner />
                    : Icon && <Icon />
            }
            
            {children}
        </ShadcnButton>
    )
}