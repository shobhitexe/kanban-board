import { NextResponse } from "next/server";
import { Columns } from "../../../../../models/columns";
import { ColumnsType } from "@/types";

export async function POST(req: Request) {
  try {
    const updatedColumns = await req.json();

    const bulkUpdateOps = updatedColumns.map((newDocument: ColumnsType) => ({
      updateOne: {
        filter: { _id: newDocument.id },
        update: { title: newDocument.title },
      },
    }));

    console.log(await Columns.bulkWrite(bulkUpdateOps));

    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
