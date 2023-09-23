import { ColumnsType, TaskType } from "@/types";
import { Dispatch } from "react";
import { IDType } from "@/types";

export async function fetchColumns(
  setColumns: Dispatch<React.SetStateAction<ColumnsType[]>>
) {
  const response = await fetch("/api/getcolumns", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const columnsArray = await response.json();

  setColumns(columnsArray);
}

export async function createNewColumn(
  columns: ColumnsType[],
  setColumns: Dispatch<React.SetStateAction<ColumnsType[]>>
) {
  const response = await fetch("/api/createcolumn", {
    method: "POST",
  });
  const columnsToAdd = await response.json();

  setColumns([...columns, columnsToAdd]);
}

export async function deleteColumnFromDB(id: IDType) {
  const response = await fetch(`/api/deletecolumn?id=${id}`, {
    method: "GET",
  });

  return response.ok;
}
