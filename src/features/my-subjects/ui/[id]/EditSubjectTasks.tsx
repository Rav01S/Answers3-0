"use client";

import { useState } from "react";
import { Tasks } from "@prisma/generated/prisma";
import Button from "@/shared/components/Buttons/Button";
import { createTask, updateTask, deleteTask } from "@/app/(pages)/(authed)/my-subjects/[id]/tasksActions";

interface EditSubjectTasksProps {
  subjectId: number;
  tasks: Tasks[];
}

export default function EditSubjectTasks({ subjectId, tasks: initialTasks }: EditSubjectTasksProps) {
  const [tasks, setTasks] = useState<Tasks[]>(initialTasks);
  const [newTask, setNewTask] = useState({ title: "", answer: "", isVip: false });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState({ title: "", answer: "", isVip: false });

  const handleCreate = async () => {
    if (!newTask.title) return;
    const created = await createTask(subjectId, newTask);
    if (created) setTasks([created, ...tasks]);
    setNewTask({ title: "", answer: "", isVip: false });
  };

  const handleEdit = (task: Tasks) => {
    setEditingId(task.id);
    setEditTask({
      title: task.title,
      answer: typeof task.answer === "string" ? task.answer : JSON.stringify(task.answer ?? ""),
      isVip: task.isVip,
    });
  };

  const handleUpdate = async (taskId: number) => {
    const updated = await updateTask(taskId, editTask);
    if (updated) setTasks(tasks.map(t => t.id === taskId ? updated : t));
    setEditingId(null);
  };

  const handleDelete = async (taskId: number) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h2 className="text-xl font-bold">Задания</h2>
      <div className="flex gap-2 items-end">
        <input
          className="border-2 border-primary px-2 py-1 rounded"
          placeholder="Название задания"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          className="border-2 border-primary px-2 py-1 rounded"
          placeholder="Ответ (JSON или текст)"
          value={newTask.answer}
          onChange={e => setNewTask({ ...newTask, answer: e.target.value })}
        />
        <label className="flex items-center gap-1">
          VIP
          <input
            type="checkbox"
            checked={newTask.isVip}
            onChange={e => setNewTask({ ...newTask, isVip: e.target.checked })}
          />
        </label>
        <Button onClick={handleCreate} variant="primary">Добавить</Button>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <div key={task.id} className="border rounded p-2 flex flex-col gap-2 bg-white">
            {editingId === task.id ? (
              <>
                <input
                  className="border px-2 py-1 rounded"
                  value={editTask.title}
                  onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                />
                <input
                  className="border px-2 py-1 rounded"
                  value={editTask.answer as string}
                  onChange={e => setEditTask({ ...editTask, answer: e.target.value })}
                />
                <label className="flex items-center gap-1">
                  VIP
                  <input
                    type="checkbox"
                    checked={editTask.isVip}
                    onChange={e => setEditTask({ ...editTask, isVip: e.target.checked })}
                  />
                </label>
                <div className="flex gap-2">
                  <Button onClick={() => handleUpdate(task.id)} variant="primary">Сохранить</Button>
                  <Button onClick={() => setEditingId(null)} variant="secondary">Отмена</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span className={`text-xs rounded px-2 py-0.5 ${task.isVip ? "bg-primary text-white" : "bg-accent text-black"}`}>
                    {task.isVip ? "VIP" : "Обычное"}
                  </span>
                </div>
                <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto">{typeof task.answer === "string" ? task.answer : JSON.stringify(task.answer, null, 2)}</pre>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(task)} variant="secondary">Редактировать</Button>
                  <Button onClick={() => handleDelete(task.id)} variant="destructive">Удалить</Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
