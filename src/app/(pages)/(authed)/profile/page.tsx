'use server';

import LogoutButton from "@/features/auth/ui/logout-button";

export default async function Page() {
    
    return <>
        <h1>Profile</h1>
        <LogoutButton />
    </>
}