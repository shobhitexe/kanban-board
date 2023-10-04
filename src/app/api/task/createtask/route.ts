import { TaskType } from "@/types";
import { NextResponse } from "next/server";
import { Tasks } from "../../../../../models/tasks";

export async function POST(req: Request) {
  try {
    const { columnId } = await req.json();
    const latestRecord = await Tasks.find({}).sort({ _id: -1 }).limit(1);

    const taskorder =
      latestRecord.length === 0 ? 1 : latestRecord[0].taskorder + 1;

    const tasktoAdd = {
      columnId,
      content: `Task ${taskorder}`,
      taskorder: taskorder,
    };

    const newTask = new Tasks(tasktoAdd);
    await newTask.save();

    const addedTask: TaskType = {
      id: newTask._id,
      columnId: columnId,
      content: `Task ${taskorder}`,
    };

    return NextResponse.json(addedTask, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
