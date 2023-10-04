import { NextResponse } from "next/server";
import { Columns } from "../../../../../models/columns";
import dbConnect from "../../../../../config/db";
import { ColumnsType } from "@/types";
import { OrderArray } from "../../../../../models/columnOrder";

export async function GET() {
  try {
    await dbConnect();
    const allColumns = await Columns.find({});
    const orderArrData = await OrderArray.find({}).limit(1);

    const orderArray: number[] = orderArrData[0].columnOrderArray;

    const updatedData: ColumnsType[] = allColumns.map((item) => {
      const { _id, title, order } = item;
      return { id: _id, title, order };
    });

    updatedData.sort((a, b) => {
      const orderA = orderArray.indexOf(a.order);
      const orderB = orderArray.indexOf(b.order);

      if (orderA === -1) return 1;
      if (orderB === -1) return -1;

      return orderA - orderB;
    });

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
