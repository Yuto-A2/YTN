import { useEffect, useState } from 'react';
import "./N5.css";
import Header from "../../../components/Header/Header";
import Level from "../../../components/Level/Level";
import Link from "next/link"; 

export default function Register() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/N5');
                const data = await response.json();
                setCategories(data); 
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories(); 
    }, []);

    return (
        <>
            <Header />
            <Level />

            <p className="myPageTxt">Let&apos;s start learning Japanese.</p>

            <div className="quizTitleContainer">
                {categories.map((category, index) => (
                    <Link key={index} href="#" className="quizLink">  
                            <div className="title">
                                <div className="textTitleBox">
                                    <p className="txtTitle">{category}</p>
                                </div>
                                <div className="score">
                                    <p>Score /10</p>
                                </div>
                            </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
