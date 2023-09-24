import { Dispatch, SetStateAction } from "react";
import { ColumnsType, IDType } from "../types";

export async function fetchColumns(
  setColumns: Dispatch<SetStateAction<ColumnsType[]>>
) {
  const response = await fetch("/api/column/getcolumns", {
    method: "GET",
  });
  const columnsArray = await response.json();

  setColumns(columnsArray);
}

export async function createNewColumn(
  columns: ColumnsType[],
  setColumns: Dispatch<SetStateAction<ColumnsType[]>>
) {
  const response = await fetch("/api/column/createcolumn", {
    method: "POST",
  });
  const columnsToAdd = await response.json();

  setColumns([...columns, columnsToAdd]);
}

export async function deleteColumnFromDB(id: IDType) {
  const response = await fetch(`/api/column/deletecolumn?id=${id}`, {
    method: "GET",
  });

  return response.ok;
}
