"use server";

import SearchSubjects from "@/features/search/ui/searchSubjects";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Результаты поиска</h1>
      <Suspense>
        <SearchSubjects />
      </Suspense>
    </>
  );
}
