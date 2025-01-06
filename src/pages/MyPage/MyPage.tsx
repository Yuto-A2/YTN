import { useEffect, useState } from 'react';
import "./mypage.css";
import MyPage from '../../../components/MyPage/MyPage';
import Header from "../../../components/Header/Header";
import Level from "../../../components/Level/Level";
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
            <div className="welcome">
                <MyPage />
                <img src="/noAvatar.png" alt="This is a profile photo." className="userImg" />
            </div>

            <p className="myPageTxt">Let&apos;s start learning Japanese.</p>
            <Level />

            <div className="txtContainer">
                <p className="txt">You have done.</p>
                <p className="txt">Click to see your history.</p>
            </div>

            {/* <div className="quizTitleContainer">
                {categories.map((category, index) => (
                    <a key={index} className="quizLink" href="#">
                        <div className="title">
                            <div className="textTitleBox">
                                <p className="txtTitle">{category}</p>
                            </div>
                            <div className="score">
                                <p>Score 10/10</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div> */}
        </>
    );
}