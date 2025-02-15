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

        const { level, category, questions } = await req.json();

        if (!level || !category || !Array.isArray(questions) || questions.length === 0) {
            return NextResponse.json({ message: "Error", error: "Invalid input data" }, { status: 400 });
        }

        const savedQuiz = await Quiz.create({
            level,
            category,
            questions
        });

        return NextResponse.json({ message: "Success", quiz: savedQuiz }, { status: 201 });
    } catch (err) {
        console.error("Error saving quiz:", err);
        return NextResponse.json({ message: "Error", error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
    }
};