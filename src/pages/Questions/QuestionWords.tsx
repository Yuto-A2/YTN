import { useEffect, useState } from 'react';
import "./question.css";
import Header from "../../../components/Header/Header";


interface Question {
    questionId: string;
    question: string;
    candidates: string[];
    answer: string;
    _id: string;
}

export default function QuestionWords() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [score, setScore] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch('/api/quiz');
                if (!response.ok) {
                    throw new Error("Failed to fetch questions");
                }
                const data = await response.json();
                if (data.quizes && data.quizes.length > 0) {
                    setQuestions(data.quizes[0].questions);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                    console.error("Error fetching questions:", error);
                } else {
                    setError("An unknown error occurred");
                    console.error("Unknown error:", error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleAnswerChange = (questionId: string, answer: string) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let userScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.questionId] === question.answer) {
                userScore++;
            }
        });

        setScore(userScore);
        setIsSubmitted(true);
    };

    return (
        <>
            <Header />
            <h2>ぎもんし</h2>
            <div className="quizTitleContainer">
                {questions.length > 0 ? (
                    <form onSubmit={handleSubmit}>
                        {questions.map((question) => (
                            <div key={question._id} className="quizItem">
                                {/* questions */}
                                <p className="quizQuestion">
                                    {question.questionId}. {question.question}
                                </p>
                                {/* choices */}
                                <div className="quizChoices">
                                    {question.candidates.map((candidate, index) => (
                                        <label key={index} className="quizChoice">
                                            <input
                                                type="radio"
                                                name={`question_${question.questionId}`}
                                                value={candidate}
                                                checked={selectedAnswers[question.questionId] === candidate}
                                                onChange={() => handleAnswerChange(question.questionId, candidate)}
                                            />
                                            {candidate}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button type="submit" className="btn">Submit</button>
                    </form>
                ) : (
                    <p>No questions available</p>
                )}
            </div>

            {isSubmitted && (
                <div className="result">
                    <h3>Your Score: {score} / {questions.length}</h3>
                </div>
            )}
        </>
    );
}
