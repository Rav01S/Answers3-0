"use client";

import Button from "@/shared/components/Buttons/Button";
import { Subjects } from "@prisma/generated/prisma";
import { useRouter } from "next/navigation";

type SubjectCardProps = {
  subject: Subjects;
  handleDelete: (subjectId: number) => void;
};

export default function SubjectCard({ subject, handleDelete }: SubjectCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded p-2 gap-4 w-full border-2 bg-primary text-white">
      <div className="card-title flex gap-2 justify-between">
        <h3 className="text-lg font-semibold">{subject.name}</h3>
        <p
          className={`text-sm w-fit rounded text-white p-1 ${
            subject.isPublic ? "bg-accent" : "bg-secondary"
          }`}
        >
          {subject.isPublic ? "Для неавторизованных" : "Только для авторизованных"}
        </p>
      </div>
      <p className="text-sm text-white">
        Дата создания: {subject.createdAt.toLocaleDateString()}
      </p>
      <div className="card-actions flex items-center gap-2 justify-end">
        <Button
          className="btn"
          onClick={() => router.push(`/my-subjects/${subject.id}`)}
        >
          Изменить
        </Button>
        <Button
          variant="destructive"
          className="btn"
          onClick={() => handleDelete(subject.id)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
