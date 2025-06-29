"use server";

import EditSubjectForm from "@/features/my-subjects/ui/[id]/EditSubjectForm";
import { getSubjectById } from "../actions";

export default async function Page(props: { params: { id: string } }) {
  const subject = await getSubjectById(Number(props.params.id));
  if (!subject) {
    return <div>Предмет не найден</div>;
  }

  return (
    <>
      <EditSubjectForm subject={subject} />
    </>
  );
}
