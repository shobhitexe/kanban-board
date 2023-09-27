import { NextResponse } from "next/server";
import { Columns } from "../../../../../models/columns";

export async function POST(req: Request) {
  try {
    const request = await req.json();

    const updatedName = await Columns.findByIdAndUpdate(
      request.id,
      {
        $set: { title: request.title },
      },
      { new: true }
    );

    return NextResponse.json({ changed: true, updatedName }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
