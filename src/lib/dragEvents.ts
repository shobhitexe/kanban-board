import { ColumnsType, TaskType } from "@/types";
import { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Dispatch, SetStateAction } from "react";

export function onDragStart(
  event: DragStartEvent,
  setActiveColumn: Dispatch<SetStateAction<ColumnsType | null>>,
  setActiveTask: Dispatch<SetStateAction<TaskType | null>>
) {
  if (event.active.data.current?.type === "Column") {
    setActiveColumn(event.active.data.current.column);
    return;
  }

  if (event.active.data.current?.type === "Task") {
    setActiveTask(event.active.data.current.task);
    return;
  }
}

export function onDragEnd(
  event: DragEndEvent,
  setActiveColumn: Dispatch<SetStateAction<ColumnsType | null>>,
  setActiveTask: Dispatch<SetStateAction<TaskType | null>>,
  setColumns: Dispatch<SetStateAction<ColumnsType[]>>
) {
  setActiveColumn(null);
  setActiveTask(null);

  const { active, over } = event;

  if (!over) return;

  const activeColumnId = active.id;
  const overColumnId = over.id;

  if (activeColumnId === overColumnId) return;

  setColumns((columns) => {
    const activeColumnIndex = columns.findIndex(
      (column) => column.id === activeColumnId
    );

    const overColumnIndex = columns.findIndex(
      (column) => column.id === overColumnId
    );

    fetch("/api/column/updatecolumnorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        arrayMove(columns, activeColumnIndex, overColumnIndex)
      ),
    });

    return arrayMove(columns, activeColumnIndex, overColumnIndex);
  });
}

export function onDragOver(
  event: DragOverEvent,
  activeTask: TaskType | null,
  setTasks: Dispatch<SetStateAction<TaskType[]>>
) {
  const { active, over } = event;

  if (!over) return;

  const activeId = active.id;
  const overId = over.id;

  if (activeId === overId) return;

  const isActiveAtTask = active.data.current?.type === "Task";
  const isOverAtTask = over.data.current?.type === "Task";

  if (!activeTask) return;

  if (isActiveAtTask && isOverAtTask) {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      tasks[activeIndex].columnId = tasks[overIndex].columnId;

      return arrayMove(tasks, activeIndex, overIndex);
    });
  }

  const isOverAtColumn = over.data.current?.type === "Column";

  if (isActiveAtTask && isOverAtColumn) {
    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);

      tasks[activeIndex].columnId = overId;

      return arrayMove(tasks, activeIndex, activeIndex);
    });
  }
}
