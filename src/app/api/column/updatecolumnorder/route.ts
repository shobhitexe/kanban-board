import { NextResponse } from "next/server";
import { ColumnsType } from "@/types";
import { OrderArray } from "../../../../../models/columnOrder";

export async function POST(req: Request) {
  try {
    const updatedColumns = await req.json();

    const updatedOrderArr: number[] = [];

    updatedColumns.map((col: ColumnsType) => {
      updatedOrderArr.push(col.order);
    });

    const updatedMongoArr = await OrderArray.findOneAndUpdate(
      {},
      { columnOrderArray: updatedOrderArr },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({
      columnOrderArray: updatedMongoArr.columnOrderArray,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
