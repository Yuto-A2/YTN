import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/dbConnect';
import Quiz from '../../../../models/Quiz';
import User from '../../../../models/User';

// スコアオブジェクトの型を定義
interface Score {
    quizId: string;
    score: number;
    dateTaken: string;
}

export async function GET() {
    await dbConnect();

    try {
        const quizzes = await Quiz.find({ level: 'N5' }).select('category');
        const categories = quizzes.map(quiz => quiz.category);
        const users = await User.find();

        // ユーザーごとのスコアを取得
        const userScores = users.map(user => {
            return {
                supabaseId: user.supabaseId,
                scores: user.scores.map((score: Score) => ({
                    quizId: score.quizId,
                    score: score.score,
                    dateTaken: score.dateTaken
                }))
            };
        });

        return NextResponse.json({ categories, userScores }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error retrieving categories or scores' }, { status: 500 });
    }
}
