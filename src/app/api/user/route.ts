import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase';

// 型の定義
interface Score {
  score: number;
}

interface PostRequestBody {
  profilePicture: string;
  scores: Score[];
}

// GET: ユーザー一覧を取得
export const GET = async () => {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
};

// POST: ユーザー情報を保存
export const POST = async (req: Request) => {
  try {
    // Supabaseから現在のセッションを取得
    const { data: { session }, error } = await supabase.auth.getSession();

    // セッションが取得できなかった場合の処理
    if (error || !session) {
      console.error("Authentication required");
      return NextResponse.json({ message: "Error", error: "Authentication required" }, { status: 401 });
    }

    // セッションが取得できた場合
    const supabaseId = session.user.id;
    console.log("User authenticated:", supabaseId);

    // MongoDBに接続
    await dbConnect();

    // クライアントから送信されたデータを取得
    const { profilePicture, scores } = await req.json();

    // ユーザーをSupabase IDで検索
    let dbUser = await User.findOne({ supabaseId });
    if (!dbUser) {
      // ユーザーが存在しない場合、新規作成
      dbUser = new User({ supabaseId });
    }

    // 合計スコアの計算（正のスコアのみ加算）
    const totalScore = scores.reduce((sum: number, score: { score: number }) => {
      return score.score > 0 ? sum + score.score : sum;
    }, 0);

    // ユーザー情報の更新
    dbUser.profilePicture = profilePicture || ""; // プロフィール画像の設定
    dbUser.scores = scores; // スコアの保存
    dbUser.totalScore = totalScore; // 合計スコアの更新

    // MongoDBに保存
    const updatedUser = await dbUser.save();

    return NextResponse.json({ message: "Success", user: updatedUser }, { status: 201 });

  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
};
