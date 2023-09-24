import { NextResponse } from "next/server";
import { Columns } from "../../../../../models/columns";
import dbConnect from "../../../../../config/db";
import { ColumnsType } from "@/types";

export async function GET() {
  try {
    await dbConnect();
    const allColumns = await Columns.find({});

    const updatedData: ColumnsType[] = allColumns.map((item) => {
      const { _id, title } = item;
      return { id: _id, title };
    });

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
