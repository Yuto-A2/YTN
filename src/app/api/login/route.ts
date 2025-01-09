import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { supabase } from '../../../../utils/supabase';

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

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !session) throw new Error("Invalid email or password");

    return NextResponse.json({ message: "Login successful", session });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: "Error", error: err.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error occurred" }, { status: 500 });
  }
};

