import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase';

export const POST = async (req: Request) => {
  try {
    const { email, password, profilePicture } = await req.json();

    // サインアップ処理
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw new Error(signUpError.message);

    // サインイン（ログイン）処理
    const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw new Error(signInError.message);

    await dbConnect();

    // 新しいユーザーをDBに保存
    const newUser = new User({
      supabaseId: user?.id,
      profilePicture: profilePicture || "",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered and logged in successfully", user: newUser, session: sessionData },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error", error: err instanceof Error ? err.message : "Unknown error" },
      { status: 400 }
    );
  }
};
