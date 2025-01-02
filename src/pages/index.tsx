import "./page.css";
import Header from "../../components/Header/Header"

export default function Home() {
  return (
    <>
      <Header />
      <div className="explanation">
        <div className="jGoalBox">
          <p className="explaneJGoal">What is J-Goal?</p>
        </div>{/* <!--/div className="jGoalBox"--> */}
        <div className="explanationBox">
          <p className="explaneJGoal1">
            J-Goal is a site to learn/practice Japanese (Expecially for JLPT).
          </p>
          <p className="explaneJGoal2">
            You can find exercises here.
          </p>
        </div>{/* <!--/div className="explanationBox"--> */}
      </div>{/* <!--/div class="explanation"--> */}

      <div className="levelContainer">
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N5</p>
          </a>
        </div>{/* <!-- /div class="nBox" --> */}
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N4</p>
          </a>
        </div>{/* <!-- /div className="nBox" --> */}
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N3</p>
          </a>
        </div>{/* <!-- /div className="nBox" --> */}
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N2</p>
          </a>
        </div>{/* <!-- /div className="nBox" --> */}
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N1</p>
          </a>
        </div>{/* <!-- /div class="nBox" --> */}
      </div>{/* <!-- /div class="levelContainer" --> */}
    </>
  );
}
