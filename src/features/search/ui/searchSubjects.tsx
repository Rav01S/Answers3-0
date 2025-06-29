"use client";

import { searchSubjects } from "@/app/(pages)/search/actions";
import Loading from "@/shared/components/Loading";
import { Subjects, User } from "@prisma/generated/prisma";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

type SubjectWithCreator = Subjects & {
  creator: User;
  _count: { tasks: number };
};

export default function SearchSubjects() {
  const [subjects, setSubjects] = useState<SubjectWithCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const query = useSearchParams().get("query") || "";

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await searchSubjects(query);
      setSubjects(response);
      setLoading(false);
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return <Loading>Ищем предметы...</Loading>;
  }

  return (
    <>
      {subjects.length === 0 ? (
        <div className="flex flex-col gap-2">
          <p>Здесь пока нет предметов, не хотите создать новый?</p>
          <Link
            className="block border-2 border-secondary w-fit px-4 py-2.5 rounded text-secondary font-bold"
            href="/my-subjects/create"
          >
            Создать новый предмет
          </Link>
        </div>
      ) : (
        <div className="subjects__container grid grid-cols-3">
          {subjects.map((subject) => (
            <div key={subject.id}>
              <h2>{subject.name}</h2>
              <p>Автор: {subject.creator.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
