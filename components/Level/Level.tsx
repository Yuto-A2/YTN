import Link from "next/link";
import "./Level.css";

export default function Header() {
  return (
    <>
      <div className="levelContainer">
                <div className="nBox">
                    <Link className="toQuiz" href="/N5Page/N5">
                        <p className="jlptLevel">N5</p>
                    </Link>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <Link className="toQuiz" href="#">
                        <p className="jlptLevel">N4</p>
                    </Link>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <Link className="toQuiz" href="#">
                        <p className="jlptLevel">N3</p>
                    </Link>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <Link className="toQuiz" href="#">
                        <p className="jlptLevel">N2</p>
                    </Link>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>

                <div className="nBox">
                    <Link className="toQuiz" href="#">
                        <p className="jlptLevel">N1</p>
                    </Link>
                    <div className="progressBar">
                        <div className="progress"></div>
                    </div>
                </div>
            </div>

    </>
  );
}
