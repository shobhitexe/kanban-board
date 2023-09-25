import { NextResponse } from "next/server";
import dbConnect from "../../../../../config/db";
import { Columns } from "../../../../../models/columns";
import { ColumnsType } from "@/types";

dbConnect();

export async function POST(req: Request) {
  try {
    const latestRecord = await Columns.find().sort({ _id: -1 }).limit(1);
    const order = latestRecord[0].order + 1;
    const title = `Column ${order}`;

    const columnToAdd = {
      title,
      order,
    };

    const newColumn = new Columns(columnToAdd);

    await newColumn.save();

    const newAddedColumn: ColumnsType = {
      id: newColumn._id,
      title,
      order,
    };

    return NextResponse.json(newAddedColumn, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
