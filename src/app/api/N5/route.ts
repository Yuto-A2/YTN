import { NextResponse } from 'next/server'; 
import dbConnect from '../../../../utils/dbConnect'; 
import Quiz from '../../../../models/Quiz'; 

export async function GET() {
    await dbConnect(); 

    try {
        const quizzes = await Quiz.find({ level: 'N5' }).select('category');
        const categories = quizzes.map(quiz => quiz.category);

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error retrieving categories' }, { status: 500 });
    }
}
