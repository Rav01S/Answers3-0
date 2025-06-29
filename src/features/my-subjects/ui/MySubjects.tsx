"use client";

import {
  deleteSubject,
  getMySubjects,
} from "@/app/(pages)/(authed)/my-subjects/actions";
import SubjectCard from "@/entities/my-subjects/ui/SubjectCard";
import Loading from "@/shared/components/Loading";
import { Subjects } from "@prisma/generated/prisma";
import Link from "next/link";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type DashBoardSubjects = Subjects[];

export default function DashBoardSubjects({ userId }: { userId: string }) {
  const router = useRouter();
  const [mySubjects, setMySubjects] = useState<DashBoardSubjects>([]);
  const [loading, setLoading] = useState(true);

  const fetchMySubjects = async () => {
    const subjects = await getMySubjects(userId);
    setMySubjects(subjects);
    setLoading(false);
  };

  useEffect(() => {
    fetchMySubjects();
  }, [userId]);

  if (loading) {
    return <Loading>Загружаем ваши предметы...</Loading>;
  }

  const handleDelete = async (subjectId: number) => {
    const confirmed = confirm("Вы уверены, что хотите удалить этот предмет?");
    if (!confirmed) return;

    const toastId = toast.loading("Удаление предмета...");
    const result = await deleteSubject(subjectId);
    if (result?.success) {
      toast.update(toastId, {
        render: "Предмет успешно удален!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setMySubjects((prev) =>
        prev.filter((subject) => subject.id !== subjectId)
      );
    } else {
      toast.update(toastId, {
        render: "Ошибка при удалении предмета",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Ваши предметы</h2>
      <div className="flex flex-col gap-2">
        {mySubjects.length === 0 && (
          <>
            <p>У вас пока нет предметов</p>
            <Link
              className="block border-2 border-secondary w-fit px-4 py-2.5 rounded text-secondary font-bold"
              href="/my-subjects/create"
            >
              Создать
            </Link>
          </>
        )}
        <div className="subjects__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySubjects.map((subject) => (
            <SubjectCard
              subject={subject}
              key={subject.id}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
