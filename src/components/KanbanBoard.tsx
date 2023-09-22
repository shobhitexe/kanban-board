"use client";

import { useMemo, useState, useEffect } from "react";
import { ColumnsType, IDType, TaskType } from "../types";
import PlusIcon from "@/icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

export default function KanbanBoard() {
  const [mounted, setMounted] = useState<boolean>(false);

  const [columns, setColumns] = useState<ColumnsType[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnsType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => setMounted(true), []);

  function createNewColumn() {
    const columnsToAdd: ColumnsType = {
      id: generateID(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnsToAdd]);
  }

  function deleteColumn(id: IDType) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: IDType, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function generateID() {
    return Math.floor(Math.random() * 10001);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
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

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
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

  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  function createTask(columnId: IDType) {
    const newTask: TaskType = {
      id: generateID(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: IDType) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: IDType, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensor}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="am-auto flex gap-4">
          <div className="flex gap-2">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={`${column.id}`}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createNewColumn()}
            className="h-[60px] w-[350px] min-w-[350px] items-center cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
          >
            <PlusIcon width={20} height={20} />
            Add Column
          </button>{" "}
        </div>
        {mounted
          ? createPortal(
              <DragOverlay>
                {activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter(
                      (task) => task.columnId === activeColumn.id
                    )}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                )}
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )
          : null}
      </DndContext>
    </div>
  );
}
