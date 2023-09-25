import { NextResponse } from "next/server";
import { ColumnsType } from "@/types";
import { OrderArray } from "../../../../../models/order";

export async function POST(req: Request) {
  try {
    const updatedColumns = await req.json();

    const updatedOrderArr: number[] = [];

    updatedColumns.map((col: ColumnsType) => {
      updatedOrderArr.push(col.order);
    });

    const updatedMongoArr = await OrderArray.findOneAndUpdate(
      {},
      { orderArray: updatedOrderArr },
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({ orderArray: updatedMongoArr.orderArray });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
