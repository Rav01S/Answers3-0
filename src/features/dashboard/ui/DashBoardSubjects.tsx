"use client";

import {
  getSubjectsOnDashBoard,
} from "@/app/(pages)/(authed)/dashboard/actions";
import Loading from "@/shared/components/Loading";
import { Subjects, User } from "@prisma/generated/prisma";
import Link from "next/link";
import { useEffect, useState } from "react";

type DashBoardSubjects = (Subjects & { creator: User })[];

export default function DashBoardSubjects({ userId }: { userId: string }) {
  const [mySubjects, setMySubjects] = useState<DashBoardSubjects>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySubjects = async () => {
      const subjects = await getSubjectsOnDashBoard(userId);
      setMySubjects(subjects);
      setLoading(false);
    };

    fetchMySubjects();
  }, [userId]);

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      
      <ul className="flex flex-col gap-2">
        {mySubjects.length === 0 && (
          <>
            <li>Вы еще не добавляли предметы на эту страницу</li>
            <Link
              className="block border-2 border-secondary w-fit px-4 py-2.5 rounded text-secondary font-bold"
              href="/search"
            >
              Найти предмет
            </Link>
          </>
        )}
        {mySubjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
    </div>
  );
}
