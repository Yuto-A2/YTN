import { NextResponse } from 'next/server'; 
import dbConnect from '../../../../utils/dbConnect'; 
import Quiz from '../../../../models/Quiz'; 
import User from '../../../../models/User'; 

export async function GET() {
    await dbConnect(); 

    try {
        const quizzes = await Quiz.find({ level: 'N5' }).select('category');
        const categories = quizzes.map(quiz => quiz.category);
        const users = await User.find();
        const scores = users.map(score => score.scores);
        return NextResponse.json({categories, scores}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error retrieving categories' }, { status: 500 });
    }
}