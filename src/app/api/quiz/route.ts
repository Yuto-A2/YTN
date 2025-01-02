import dbConnect from "../../../../utils/dbConnect";
import Quiz from "../../../../models/Quiz";
import { NextResponse } from "next/server";

// GET quizes
export const GET = async () => {
    try {
        await dbConnect(); 
        const quizes = await Quiz.find(); 
        return NextResponse.json({ message: "Success", quizes }, { status: 200 });
    } catch (err) {
        console.error("Error fetching quizes:", err);
        return NextResponse.json({ message: "Error", error: err }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
   try {
      await dbConnect(); 
      
      const { quizId, level, category, question, candidates, answer } = await req.json(); 

      const savedQuiz = await Quiz.create({ quizId, level, category, question, candidates, answer });
      
      return NextResponse.json({ message: "Success", quiz: savedQuiz }, { status: 201 });
   } catch (err) {
      console.error("Error saving quiz:", err);
      return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
   }
};
