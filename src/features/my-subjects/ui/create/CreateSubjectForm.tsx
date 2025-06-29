"use client";

import { createSubject } from "@/app/(pages)/(authed)/my-subjects/actions";
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

export default function CreateSubjectForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      name: "",
      isPublic: false,
    },
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormState) => {
    setLoading(true);
    const result = await createSubject(data);
    if (result?.success) {
      toast.success("Предмет успешно создан!");
    } else {
      toast.error("Ошибка при создании предмета");
    }
    setLoading(false);
    router.replace("/my-subjects");
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-xl mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold mb-4">Создать предмет</h1>
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
      <Button disabled={loading} variant="primary" type="submit">
        Создать предмет
      </Button>
    </form>
  );
}
