"use server";

import { auth } from "@/shared/lib/auth";
import prisma from "@prisma/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getMySubjects = async (userId: string) => {
  const mySubjects = await prisma.subjects.findMany({
    where: {
      createdBy: userId,
    },
  });

  return mySubjects;
};

export const createSubject = async (data: {
  name: string;
  isPublic: boolean;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
    return;
  }

  try {
    const newSubject = await prisma.subjects.create({
      data: {
        name: data.name,
        isPublic: data.isPublic,
        createdBy: session?.user.id,
      },
    });
    return { success: true, subject: newSubject };
  } catch (e) {
    return { success: false, subject: null, error: e };
  }
};

export const editSubject = async (
  id: number,
  data: {
    name: string;
    isPublic: boolean;
  }
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
    return;
  }

  try {
    const newSubject = await prisma.subjects.update({
      where: { id: id, createdBy: session.user.id },
      data: {
        name: data.name,
        isPublic: data.isPublic,
      },
    });
    return { success: true, subject: newSubject };
  } catch (e) {
    return { success: false, subject: null, error: e };
  }
};

export const getSubjectById = async (id: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
    return;
  }

  const subject = await prisma.subjects.findUnique({
    where: { id: id, createdBy: session.user.id },
  });

  return subject;
};

export const deleteSubject = async (id: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
    return;
  }

  try {
    await prisma.subjects.delete({
      where: { id: id, createdBy: session.user.id },
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: e };
  }
};
