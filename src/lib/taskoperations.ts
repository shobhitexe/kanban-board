import { IDType, TaskType } from "@/types";
import { Dispatch, SetStateAction } from "react";

export async function fetchTasks(
  setTasks: Dispatch<SetStateAction<TaskType[]>>
) {
  const response = await fetch("/api/task/gettasks", {
    method: "GET",
  });

  const tasksArray = await response.json();

  setTasks(tasksArray);
}

export async function createTask(
  tasks: TaskType[],
  columnId: IDType,
  setTasks: Dispatch<SetStateAction<TaskType[]>>
) {
  const response = await fetch("/api/task/createtask", {
    method: "POST",
    body: JSON.stringify({ columnId }),
  });

  const newTask = await response.json();

  setTasks([...tasks, newTask]);
}

export async function deleteTask(
  id: IDType,
  setTasks: Dispatch<SetStateAction<TaskType[]>>,
  tasks: TaskType[]
) {
  const tasksOld = tasks;

  const newTasks = tasks.filter((task) => task.id !== id);
  setTasks(newTasks);

  const response = await fetch("/api/task/deletetask", {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  if (response.ok) return;

  setTasks(tasksOld);
}

export async function updateTaskContent(id: IDType, content: string) {
  const response = await fetch("/api/task/updatetaskcontent", {
    method: "POST",
    body: JSON.stringify({ id, content }),
  });

  return response.ok;
}
