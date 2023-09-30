import { NextResponse } from "next/server";
import { Columns } from "../../../../../models/columns";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const column = await Columns.findById(id);

    if (!column) return NextResponse.json({ deleted: false }, { status: 500 });

    await Columns.deleteOne(column);

    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
