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
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      console.error("Authentication required");
      return NextResponse.json({ message: "Error", error: "Authentication required" }, { status: 401 });
    }

    const supabaseId = session.user.id;
    console.log("User authenticated:", supabaseId);

    await dbConnect();

    const { profilePicture, scores } = await req.json();

    let dbUser = await User.findOne({ supabaseId });
    if (!dbUser) {
      dbUser = new User({ supabaseId });
    }

    const totalScore = scores.reduce((sum: number, score: { score: number }) => {
      return score.score > 0 ? sum + score.score : sum;
    }, 0);

    dbUser.profilePicture = profilePicture || ""; 
    dbUser.scores = scores; 
    dbUser.totalScore = totalScore; 

    const updatedUser = await dbUser.save();

    return NextResponse.json({ message: "Success", user: updatedUser }, { status: 201 });

  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
};
