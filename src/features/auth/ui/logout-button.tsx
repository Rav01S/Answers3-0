'use client';

import Button from "@/shared/components/Buttons/Button";
import { authClient } from "@/shared/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
    className?: string;
}

export default function LogoutButton({ className }: Props) {
    const router = useRouter();
    const logoutHandled = async () => {
        const result = await authClient.signOut({fetchOptions: {
            onSuccess: () => {
                router.refresh();
                router.push("/sign-in");
            },
            onError: (error) => {
                toast.error(`Logout error: ${error.error.message}`);
            }
        }});
    }

    return <Button variant="primary" onClick={logoutHandled} className={className}>
        Выйти из аккаунта
    </Button>
}