"use client";

import { authClient } from "@/shared/lib/auth-client";
import Link from "next/link";

export default function notFound() {
  const session = authClient.useSession();

  const isAuthed = !!session?.data?.session;

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold">Страница не найдена</h1>
      <p>Извините, но запрашиваемая страница не существует.</p>
      <Link
        className="block border-2 border-secondary w-fit px-4 py-2.5 rounded text-secondary font-bold"
        href={isAuthed ? "/dashboard" : "/login"}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
