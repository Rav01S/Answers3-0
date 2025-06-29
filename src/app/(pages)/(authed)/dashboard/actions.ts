"use server";

import prisma from "@prisma/prisma";

export const getSubjectsOnDashBoard = async (userId: string) => {
  const subjectsOnDashboard = await prisma.userDashboardSubject.findMany({
    where: {
      userId: userId,
    }
  });

  if (!subjectsOnDashboard) {
    throw new Error("Failed to fetch subjects on dashboard");
  }

  const subjects = await prisma.subjects.findMany({
    where: {
      id: {
        in: subjectsOnDashboard.map((subject) => subject.subjectId),
      },
    },
    include: {
        creator: true
    }
  });

  return subjects;
};
