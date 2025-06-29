"use client";

import {
  createSubject,
  deleteSubject,
  editSubject,
} from "@/app/(pages)/(authed)/my-subjects/actions";
import Button from "@/shared/components/Buttons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subjects } from "@prisma/generated/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as zod from "zod";

type FormState = Pick<Subjects, "name" | "isPublic">;
const schema = zod.object({
  name: zod.string().min(2, { message: "Слишком короткое название" }).max(100),
  isPublic: zod.boolean(),
});

export default function EditSubjectForm({ subject }: { subject: Subjects }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormState>({
    defaultValues: {
      name: subject.name,
      isPublic: subject.isPublic,
    },
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormState) => {
    setLoading(true);
    const result = await editSubject(subject.id, data);
    if (result?.success) {
      toast.success("Предмет успешно изменен!");
    } else {
      toast.error("Ошибка при изменении предмета");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = confirm("Вы уверены, что хотите удалить этот предмет?");
    if (!confirmed) return;

    const toastId = toast.loading("Удаление предмета...");
    setLoading(true);
    const result = await deleteSubject(subject.id);
    if (result?.success) {
      toast.update(toastId, {
        render: "Предмет успешно удален!",
        type: "success",
        isLoading: false,
      });
    } else {
      toast.update(toastId, {
        render: "Ошибка при удалении предмета",
        type: "error",
        isLoading: false,
      });
    }
    setLoading(false);
    router.push("/my-subjects");
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-xl mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold mb-4">Изменить предмет</h1>
      <label className="flex flex-col gap-2 ">
        Название предмета
        <input
          className="border-2 border-primary px-4 py-2.5 rounded"
          type="text"
          {...register("name")}
          placeholder="Название предмета"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </label>
      <label className="flex gap-2">
        Доступен неавторизованным пользователям
        <input type="checkbox" {...register("isPublic")} />
        <p className="text-red-500 text-sm">{errors.isPublic?.message}</p>
      </label>
      <div className="buttons-container flex items-center gap-2">
        <Button
          className="w-full"
          disabled={loading || !isDirty}
          variant="primary"
          type="submit"
        >
          Сохранить изменения
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Удалить
        </Button>
      </div>
    </form>
  );
}
