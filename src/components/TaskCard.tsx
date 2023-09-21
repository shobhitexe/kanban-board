import TrashIcon from "@/icons/TrashIcon";
import { IDType, TaskType } from "@/types";
import { useState } from "react";

type TaskCardProps = {
  task: TaskType;
  deleteTask: (id: IDType) => void;
  updateTask: (id: IDType, content: string) => void;
};

export default function TaskCard({
  task,
  deleteTask,
  updateTask,
}: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);

  function toggleEditMode() {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  }

  if (editMode) {
    return (
      <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left relative rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab">
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task Content Here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="task bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left relative rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon width={20} height={20} />
        </button>
      )}
    </div>
  );
}
