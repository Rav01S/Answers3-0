"use server";

import MySubjects from "@/features/my-subjects/ui/MySubjects";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id || "";

  return (
    <>
      <MySubjects userId={userId} />
    </>
  );
}
