import { NextResponse } from "next/server";
import { Tasks } from "../../../../../models/tasks";
import dbConnect from "../../../../../config/db";
import { TaskType } from "@/types";

export async function GET() {
  try {
    await dbConnect();
    const allTasks = await Tasks.find({});

    const updatedTasks: TaskType[] = allTasks.map((item) => {
      const { _id, columnId, content } = item;
      return { id: _id, columnId, content };
    });

    return NextResponse.json(updatedTasks, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.error();
  }
}
