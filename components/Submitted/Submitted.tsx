import { FC } from "react";
import { useRouter } from "next/router";
import "./submitted.css";

interface ResultProps {
    score: number;
    totalQuestions: number;
    onTryAgain: () => void;
}

const Result: FC<ResultProps> = ({ score, totalQuestions, onTryAgain }) => {
    const router = useRouter();

    const handleGoToMyPage = () => {
        router.push("/MyPage/MyPage");
    };

    return (
        <div className="result">
            <h3>Your Score: {score} / {totalQuestions}</h3>
            <p className="result-message">
                Correct answers are shown in blue, and incorrect answers are shown in red.
            </p>
            <div className="result-buttons">
                <button
                    className="btn try-again"
                    onClick={onTryAgain}
                >
                    Try Again
                </button>
                <button
                    className="btn mypage"
                    onClick={handleGoToMyPage} 
                >
                    Go to MyPage
                </button>
            </div>
        </div>
    );
};

export default Result;
