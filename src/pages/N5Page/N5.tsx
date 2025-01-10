import { useEffect, useState } from 'react';
import "./N5.css";
import Header from "../../../components/Header/Header";
import Level from "../../../components/Level/Level";
import Link from "next/link";
import { useRouter } from 'next/router';
import { supabase } from '../../../utils/supabase';

interface Category {
    name: string;
    link: string;
    quizId: string; 
}

interface Score {
    quizId: string;
    score: number;
    dateTaken: string;
}

interface UserScores {
    supabaseId: string;
    scores: Score[];
}

export default function Register() {
    const [categories, setCategories] = useState<Category[]>([]); 
    const [userScores, setUserScores] = useState<UserScores[]>([]); 
    const [supabaseId, setSupabaseId] = useState<string | null>(null); 
    const router = useRouter(); 

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/N5');
                const data = await response.json();
                console.log("API response:", data); 
                setCategories(data.categories);
                setUserScores(data.userScores || []); 
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        async function checkLoginStatus() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/Login/Login');
            } else {
                console.log("Logged in supabaseId:", session.user.id);
                setSupabaseId(session.user.id);
            }
        }

        checkLoginStatus();
    }, [router]);

    const getScoreForCategory = (categoryName: string, currentSupabaseId: string): number => {
        const categoryToQuizIdMap: { [key: string]: string } = {
            "ぎもんし": "67771274ed0249d0b394ef63",
            "じょどうし": "677723dfed0249d0b394ef7c",
        };
    
        const quizId = categoryToQuizIdMap[categoryName];
        console.log(`quizId for ${categoryName}: ${quizId}`);  // quizIdをログに追加
    
        if (!quizId) {
            console.log(`No quizId found for category: ${categoryName}`);
            return 0;
        }
    
        if (!Array.isArray(userScores)) {
            console.log("userScores is not an array:", userScores);
            return 0;
        }
    
        const userScore = userScores.find(user => user.supabaseId === currentSupabaseId);
        if (!userScore) {
            console.log(`No user found with supabaseId: ${currentSupabaseId}`);
            return 0;
        }
    
        console.log(`User scores for ${currentSupabaseId}:`, userScore.scores);  // ユーザーのスコアをログに表示
    
        const scoreObj = userScore.scores.find(score => score.quizId === quizId);
        if (!scoreObj) {
            console.log(`No score found for quizId: ${quizId}`);
            return 0;
        }
    
        console.log(`Score for quizId ${quizId}: ${scoreObj.score}`);  // スコアをログに表示
        return scoreObj.score;
    };
    
    return (
        <>
            <Header />
            <Level />
            <p className="myPageTxt">Let&apos;s start learning Japanese.</p>
            <div className="quizTitleContainer">
                {categories.map((category, index) => {
                    if (!supabaseId) return <div key={index}>Loading...</div>;
                    const score = getScoreForCategory(category.name, supabaseId);
                    return (
                        <Link key={index} href={category.link || "#"} className={`quizLink ${!category.link && "disabled"}`}>
                            <div className="title">
                                <div className="textTitleBox">
                                    <p className="txtTitle">{category.name}</p>
                                </div>
                                <div className="score">
                                    <p>Score {score}/10</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
