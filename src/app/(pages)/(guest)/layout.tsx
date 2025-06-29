'use server';

import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({children}: {
    children: React.ReactNode
}) {
    const user = await auth.api.getSession({headers: await headers()});

    if (user) {
        return redirect("/dashboard");
    }

    return <>
        {children}
    </>
}