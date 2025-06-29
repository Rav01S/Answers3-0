"use client";
import EditSubjectForm from "@/features/my-subjects/ui/[id]/EditSubjectForm";
import EditSubjectTasks from "@/features/my-subjects/ui/[id]/EditSubjectTasks";
import { Tasks, Subjects } from "@prisma/generated/prisma";

export default function PageClient({ subject, tasks }: { subject: Subjects, tasks: Tasks[] }) {
  return (
    <>
      <EditSubjectForm subject={subject} />
      <EditSubjectTasks subjectId={subject.id} tasks={tasks} />
    </>
  );
}
