import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "../../../../../utils/dbConnect";
import Quiz from "../../../../../models/Quiz";

// GET /api/quiz/id?id=xxxxx
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing ID" }, { status: 400 });
    }

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", quiz }, { status: 200 });
  } catch (err) {
    console.error("Error fetching quiz:", err);
    return NextResponse.json(
      { message: "Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
