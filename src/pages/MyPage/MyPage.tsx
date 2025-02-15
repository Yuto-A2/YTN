import "./mypage.css";
import MyPage from '../../../components/MyPage/MyPage';
import Header from "../../../components/Header/Header";
import Level from "../../../components/Level/Level";
import { supabase } from '../../../utils/supabase';
import { useEffect, useState } from "react";

interface Quiz {
    quizId: string;
    score: number;
}

interface Category {
    name: string;
    link: string;
    quizId: string;
}

export default function Register() {
    const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    async function fetchQuizzes(userId?: string) {
        try {
            const response = await fetch(`/api/user?supabaseId=${userId}`);
            const data = await response.json();
            if (data.scores && Array.isArray(data.scores)) {
                const completedQuiz = data.scores.filter((score: { quizId: string, score: number }) => score.quizId && score.score !== undefined);
                setCompletedQuizzes(completedQuiz);
            }
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    }

    useEffect(() => {
        async function checkLoginStatus() {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                console.log("User is not logged in");
            } else {
                fetchQuizzes(session.user.id);
            }
        }

        checkLoginStatus();
    }, []);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/quiz');
                const data = await response.json();
                console.log("API response:", data);

                const allCategories = data.quizes.map((quiz: any) => quiz.category);
                setCategories(allCategories);

            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, []);


    return (
        <>
            <Header />
            <div className="welcome">
                <MyPage />
                <img src="/noAvatar.png" alt="This is a profile photo." className="userImg" />
            </div>

            <p className="myPageTxt">Let&apos;s start learning Japanese.</p>
            <p className="myPageTxt">Only N5 quizzes are available for now.</p>
            <Level />

            <div className="txtContainer">
                {completedQuizzes.length > 0 ? (
                    <>
                        <p className="txt">Here are the tasks you have completed.</p>
                        <p className="txt">Click to see your history.</p>
                    </>
                ) : (
                    <>
                        <p className="txt">You haven't completed any tasks yet.</p>
                        <p className="txt">Start working on quizzes to track your progress!</p>
                    </>
                )}
            </div>

            <div className="quizTitleContainer">
                {categories.map((category, categoryIndex) => {
                    const completedCategoryQuizzes = completedQuizzes.filter(completedQuiz => completedQuiz.quizId === category.quizId);

                    if (completedCategoryQuizzes.length > 0) {
                        return (
                            <a key={categoryIndex} className="quizLink" href={category.link}>
                                <div className="title">
                                    <div className="textTitleBox">
                                        <div className="categoryItem">
                                            <p className="categoryName">{category.name}</p>
                                        </div>
                                    </div>
                                    <div className="score2">
                                        {completedCategoryQuizzes.map((completedQuiz, quizIndex) => (
                                            <p key={quizIndex}>Score {completedQuiz.score}/10</p>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        );
                    }

                    return null;
                })}
            </div>

        </>
    );
}
