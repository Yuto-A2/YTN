import "./mypage.css";
import { useRouter } from 'next/router';
import MyPage from '../../../components/MyPage/MyPage';
import Header from "../../../components/Header/Header"

export default function Register() {
    const router = useRouter();

    return (
        <>
            <Header />
            <div className="welcome">
                <MyPage />
                <img src="/noAvatar.png" alt="This is a profile photo." className="userImg" />
            </div>

            <p className="myPageTxt">Let's start learning Japanese.</p>

            <div className="levelContainer">
                <div className="nBox">
                    <a className="toQuiz" href="../Practice/Practice.html">
                        <p className="jlptLevel">N5</p>
                    </a>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <a className="toQuiz" href="#">
                        <p className="jlptLevel">N4</p>
                    </a>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <a className="toQuiz" href="#">
                        <p className="jlptLevel">N3</p>
                    </a>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <a className="toQuiz" href="#">
                        <p className="jlptLevel">N2</p>
                    </a>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <a className="toQuiz" href="#">
                        <p className="jlptLevel">N1</p>
                    </a>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>
            </div>

            <div className="txtContainer">
                <p className="txt">You have done.</p>
                <p className="txt">Click to see your history.</p>
            </div>

            <div className="quizTitleContainer">

                <a className="quizLink" href="#">
                    <div className="title">
                        <div className="textTitleBox">
                            <p className="txtTitle">「です」と「でした」</p>
                        </div>
                        <div className="score">
                            <p>Score 10/10</p>
                        </div>
                    </div>
                </a>

                <a className="quizLink" href="#">
                    <div className="title">
                        <div className="textTitleBox">
                            <p className="txtTitle">「ます」と「ました」</p>
                        </div>
                        <div className="score">
                            <p>Score 10/10</p>
                        </div>
                    </div>
                </a>

                <a className="quizLink" href="#">
                    <div className="title">
                        <div className="textTitleBox">
                            <p className="txtTitle">ぎもんし</p>
                        </div>
                        <div className="score">
                            <p>Score 8/10</p>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
}
