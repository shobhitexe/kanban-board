import { NextResponse } from "next/server";
import dbConnect from "../../../../../config/db";
import { Columns } from "../../../../../models/columns";
import { ColumnsType } from "@/types";

dbConnect();

export async function POST(req: Request) {
  try {
    const count = await Columns.count();
    const title = `Column ${count + 1}`;

    const columnToAdd = {
      title,
    };

    const newColumn = new Columns(columnToAdd);

    await newColumn.save();

    const newAddedColumn: ColumnsType = {
      id: newColumn._id,
      title,
    };

    return NextResponse.json(newAddedColumn, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
