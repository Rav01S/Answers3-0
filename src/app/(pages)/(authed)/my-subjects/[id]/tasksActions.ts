"use server";

import { auth } from "@/shared/lib/auth";
import prisma from "@prisma/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getTasksBySubject = async (subjectId: number) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
    return;
  }
  return prisma.tasks.findMany({
    where: { subjectId, createdBy: session.user.id },
    orderBy: { createdAt: "desc" },
  });
};

export const createTask = async (subjectId: number, data: { title: string; answer: any; isVip: boolean; }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
    return;
  }
  const task = await prisma.tasks.create({
    data: {
      subjectId,
      title: data.title,
      answer: data.answer,
      isVip: data.isVip,
      createdBy: session.user.id,
    },
  });
  return task;
};

export const updateTask = async (taskId: number, data: { title: string; answer: any; isVip: boolean; }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
    return;
  }
  return prisma.tasks.update({
    where: { id: taskId, createdBy: session.user.id },
    data,
  });
};

export const deleteTask = async (taskId: number) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
    return;
  }
  await prisma.tasks.delete({
    where: { id: taskId, createdBy: session.user.id },
  });
  return { success: true };
};
