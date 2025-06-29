'use client';

import Button from "@/shared/components/Buttons/Button";
import { authClient } from "@/shared/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Sign in only by Google
export default function SignInForm() {
    const router = useRouter();
    const handleLogin = async () => {
        await authClient.signIn.social({provider: "google", callbackURL: `${window.location.origin}/dashboard`})
    }

    return <>
        <h1>Вход</h1>
        <Button variant="primary" onClick={handleLogin}>Войти с помощью Google</Button>
    </>
}