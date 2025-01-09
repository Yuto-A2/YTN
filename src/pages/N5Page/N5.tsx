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
}

interface Score {
    quizId: string;
    score: number;
}

export default function Register() {
    const [categories, setCategories] = useState<Category[]>([]); 
    const [scores, setScores] = useState<Score[][]>([]); 
    const router = useRouter();

    const getScoreForCategory = (categoryName: string): number => {
        const categoryToQuizIdMap: { [key: string]: string } = {
            "ぎもんし": "67771274ed0249d0b394ef63",
            "じょどうし": "1234567890abcdef12345678",
        };

        const quizId = categoryToQuizIdMap[categoryName];
        if (!quizId) return 0;

        const flatScores = scores.flat(); 
        const scoreObj = flatScores.find((score: Score) => score.quizId === quizId);
        return scoreObj ? scoreObj.score : 0; 
    };
    

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/N5');
                const data = await response.json();
                setCategories(data.categories); 
                setScores(data.scores);
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
                }
            }
    
            checkLoginStatus();
        }, [router]);
    


    return (
        <>
            <Header />
            <Level />

            <p className="myPageTxt">Let&apos;s start learning Japanese.</p>

            <div className="quizTitleContainer">
                {categories.map((category, index) => {
                    const score = getScoreForCategory(category.name); 

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
