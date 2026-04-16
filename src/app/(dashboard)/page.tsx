"use client"

import useAuth from "@/hooks/use-auth";

export default function Page() {
    const auth = useAuth();

    console.log(auth);

    return (
        <div></div>
    )
}