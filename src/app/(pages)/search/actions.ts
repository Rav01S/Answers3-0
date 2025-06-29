"use server";

import prisma from "@prisma/prisma";

export const searchSubjects = async (query: string) => {
  const response = await prisma.subjects.findMany({
    include: {
      creator: true,
      _count: {
        select: { tasks: true },
      },
    },
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { creator: { name: { contains: query, mode: "insensitive" } } },
      ],
    },
  });

  return response;
};
