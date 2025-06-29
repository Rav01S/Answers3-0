"use server";

import EditSubjectForm from "@/features/my-subjects/ui/[id]/EditSubjectForm";
import { getSubjectById } from "../actions";
import PageClient from "./pageClient";
import { getTasksBySubject } from "./tasksActions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const subject = await getSubjectById(Number((await props.params).id));
  if (!subject) {
    return <div>Предмет не найден</div>;
  }
  const tasks = await getTasksBySubject(subject.id);
  return <PageClient subject={subject} tasks={tasks || []} />;
}
