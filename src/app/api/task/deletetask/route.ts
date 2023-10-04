import { NextResponse } from "next/server";
import { Tasks } from "../../../../../models/tasks";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const task = await Tasks.findById(id);

    if (!task) return NextResponse.json({ deleted: false }, { status: 500 });

    await Tasks.deleteOne(task);

    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
