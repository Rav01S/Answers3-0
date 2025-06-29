"use server";

import DashBoardSubjects from "@/features/dashboard/ui/DashBoardSubjects";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="title-container flex gap-2 justify-between">
        <h1 className="text-3xl font-bold">Предметы</h1>
        <div className="buttons-container flex flex-wrap gap-4">
          <Link
            className="block border-2 border-secondary w-fit px-4 py-2.5 rounded text-secondary font-bold"
            href="/search"
          >
            Найти предмет
          </Link>
          <Link
            className="block border-2 border-secondary w-fit px-4 py-2.5 rounded text-secondary font-bold"
            href="/my-subjects/create"
          >
            Создать предмет
          </Link>
        </div>
      </div>
      <DashBoardSubjects userId={session?.user.id || ""} />
    </>
  );
}
