import dbConnect from '../../../../utils/dbConnect';
import Quiz from '../../../../models/Quiz';

export const GET = async () => {  
    try {
        await dbConnect(); 
        const quizzes = await Quiz.find({ level: 'N5' }).select('category');
        const categories = quizzes.map(quiz => quiz.category); 
        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error retrieving categories' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
