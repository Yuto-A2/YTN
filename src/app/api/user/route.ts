import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
      const url = new URL(req.url);
      const supabaseId = url.searchParams.get("supabaseId");
      const quizId = url.searchParams.get("quizId"); 
  
      if (!supabaseId) {
        return NextResponse.json({ message: "Supabase ID is required" }, { status: 400 });
      }
  
      await dbConnect();
  
      const dbUser = await User.findOne({ supabaseId });
  
      if (!dbUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      if (quizId) {
        const score = dbUser.scores.find((s: { quizId: string }) => s.quizId === quizId);
        if (score) {
          return NextResponse.json({ message: "Score found", score }, { status: 200 });
        } else {
          return NextResponse.json({ message: "Score for the given quizId not found" }, { status: 404 });
        }
      }
  
      const { scores, totalScore } = dbUser;
  
      return NextResponse.json({ scores, totalScore }, { status: 200 });
    } catch (err) {
      console.error("Error fetching user score:", err);
      return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
  };

export const POST = async (req: Request) => {
  try {
    const { supabaseId, quizId, score, profilePicture } = await req.json();

    await dbConnect();

    let dbUser = await User.findOne({ supabaseId });
    if (!dbUser) {
      dbUser = new User({
        supabaseId,
        profilePicture: profilePicture || "",
        scores: [],
        totalScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const existingScore = dbUser.scores.find((s: { quizId: string }) => s.quizId === quizId);
    if (existingScore) {
      existingScore.score = score; 
    } else {
      dbUser.scores.push({ quizId, score }); 
    }

    dbUser.totalScore = dbUser.scores.reduce((total: number, s: { score: number }) => total + s.score, 0);

    await dbUser.save();

    return NextResponse.json({ message: "User created/updated successfully", user: dbUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating or creating user:", err);
    return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
};
