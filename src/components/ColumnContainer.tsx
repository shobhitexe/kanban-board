import PlusIcon from "@/icons/PlusIcon";
import TrashIcon from "@/icons/TrashIcon";
import { ColumnsType, IDType, TaskType } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import TaskCard from "./TaskCard";

type ColumnContainerProps = {
  column: ColumnsType;
  deleteColumn: (id: IDType) => void;
  updateColumn: (id: IDType, title: string) => void;
  createTask: (columnId: IDType) => void;
  tasks: TaskType[];
  deleteTask: (id: IDType) => void;
  updateTask: (id: IDType, content: string) => void;
};

export default function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: ColumnContainerProps) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="flex gap-2 items-center w-full justify-center bg-mainBackgroundColor"
      >
        <div className="flex justify-center px-2 py-1 text-sm rounded-full">
          0
        </div>
        <div className=" text-sm cursor-grab rounded-md rounded-b-none p-3 font-bold">
          {!editMode && column.title}
          {editMode && (
            <input
              value={column.title}
              className="bg-black focus:border-rose-500 rounded outline-none px-2"
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            ></input>
          )}
        </div>
        <button onClick={() => deleteColumn(column.id)}>
          <TrashIcon
            width={24}
            height={24}
            className="stroke-gray-500 hover:stroke-white"
          />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
      <button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
      >
        <PlusIcon width={20} height={20} />
        Add Task
      </button>
    </div>
  );
}
