"use client";

import { useState } from "react";
import { ColumnsType } from "../types";
import PlusIcon from "@/icons/PlusIcon";
import ColumnContainer from "./ColumnContainer";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnsType[]>([]);

  console.log(columns);

  function createNewColumn() {
    const columnsToAdd: ColumnsType = {
      id: generateID(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnsToAdd]);
  }

  function generateID() {
    return Math.floor(Math.random() * 10001);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="am-auto flex gap-4">
        <div className="flex gap-2">
          {columns.map((column) => (
            <ColumnContainer key={`${column.id}`} column={column} />
          ))}
        </div>
      </div>

      <button
        onClick={() => createNewColumn()}
        className="h-[60px] w-[350px] min-w-[350px] items-center cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2"
      >
        <PlusIcon width={20} height={20} />
        Add Column
      </button>
    </div>
  );
}
