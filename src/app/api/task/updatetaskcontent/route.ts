import { NextResponse } from "next/server";
import { Tasks } from "../../../../../models/tasks";

export async function POST(req: Request) {
  try {
    const { id, content } = await req.json();

    console.log(id, content);

    const updatedContent = await Tasks.findByIdAndUpdate(
      id,
      {
        $set: { content: content },
      },
      { new: true }
    );

    return NextResponse.json(
      { changed: true, updatedContent },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
