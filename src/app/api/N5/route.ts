import { NextResponse } from 'next/server'; // NextResponse をインポート
import dbConnect from '../../../../utils/dbConnect'; 
import Quiz from '../../../../models/Quiz'; 

export async function GET(req: Request) {
    await dbConnect(); // データベースに接続

    try {
        // level が 'N5' のカテゴリを Quiz コレクションから取得
        const quizzes = await Quiz.find({ level: 'N5' }).select('category');
        const categories = quizzes.map(quiz => quiz.category);

        // NextResponse を使って JSON レスポンスを返す
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error retrieving categories' }, { status: 500 });
    }
}
