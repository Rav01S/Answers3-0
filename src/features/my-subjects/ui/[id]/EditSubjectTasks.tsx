"use client";

import { Tasks } from "@prisma/generated/prisma";

export default function EditSubjectTasks({ tasks }: { tasks: Tasks[] }) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p
            className={`text-white rounded p-1 ${
              task.isVip ? "bg-primary" : "bg-accent"
            }`}
          >
            {task.isVip ? "Доступно для VIP" : "Доступно всем"}
          </p>
        </div>
      ))}
    </>
  );
}
