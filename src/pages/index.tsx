import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import { supabase } from '../../utils/supabase';
import "./page.css";
import Header from "../../components/Header/Header";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); 


  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: user } = await supabase.auth.getUser(); 
      if (user) {
        setIsLoggedIn(true);
      }
    };

    checkUserStatus();
  }, []);

 
  useEffect(() => {
    if (isLoggedIn) {
      router.push("MyPage/MyPage"); 
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Header />
      <div className="explanation">
        <div className="jGoalBox">
          <p className="explaneJGoal">What is J-Goal?</p>
        </div>
        <div className="explanationBox">
          <p className="explaneJGoal1">
            J-Goal is a site to learn/practice Japanese (Especially for JLPT).
          </p>
          <p className="explaneJGoal2">
            You can find exercises here.
          </p>
        </div>
      </div>

      <div className="levelContainer">
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N5</p>
          </a>
        </div>
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N4</p>
          </a>
        </div>
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N3</p>
          </a>
        </div>
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N2</p>
          </a>
        </div>
        <div className="nBox">
          <a className="toQuiz" href="">
            <p className="jlptLevel">N1</p>
          </a>
        </div>
      </div>
    </>
  );
}
