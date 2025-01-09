import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
      const url = new URL(req.url);
      const supabaseId = url.searchParams.get("supabaseId");
  
      if (!supabaseId) {
        return NextResponse.json({ message: "Supabase ID is required" }, { status: 400 });
      }
  
      await dbConnect();
  
      // supabaseId でユーザーを検索
      const dbUser = await User.findOne({ supabaseId });
  
      if (!dbUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      // ユーザーのスコア情報を取得
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

    // ユーザーの検索または作成
    let dbUser = await User.findOne({ supabaseId });
    if (!dbUser) {
      // 新しいユーザーを作成
      dbUser = new User({
        supabaseId,
        profilePicture: profilePicture || "",
        scores: [],
        totalScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // スコアの更新または追加
    const existingScore = dbUser.scores.find((s: { quizId: string }) => s.quizId === quizId);
    if (existingScore) {
      existingScore.score = score; // 既存のスコアを更新
    } else {
      dbUser.scores.push({ quizId, score }); // 新しいスコアを追加
    }

    dbUser.totalScore = dbUser.scores.reduce((total: number, s: { score: number }) => total + s.score, 0);

    // ユーザーを保存
    await dbUser.save();

    return NextResponse.json({ message: "User created/updated successfully", user: dbUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating or creating user:", err);
    return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
};
