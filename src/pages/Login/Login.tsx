import "./login.css";
import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { useRouter } from 'next/router'
import Header from "../../../components/Header/Header"
import Footer from "../../../components/Footer/Footer"

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);
            console.log("User logged in:", data);
            router.push('/MyPage/MyPage');
        } catch (err: unknown) {
            console.error(err);
        }
    };

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
            <div className="main">
                <div className="loginPageContainer">
                    <p className="loginLetter">Log in</p>
                    <div className="loginPageBox">
                        <p className="loginExplanation1">If you log in, you can record your score.</p>
                        <p className="loginExplanation2">That will be easy to review exercises.</p>
                    </div>
                </div>

                <div className="loginContainer">
                    <div className="loginForm">
                        <form className="login" method="post" onSubmit={doLogin}>
                            <div className="formGroup">
                                <label htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="formBtn">
                                <button className="btn" type="submit">Login</button>
                            </div>
                        </form>
                    </div>

                    <div className="notRegisterd">
                        <p className="registerTxt">To users not yet registered</p>
                        <p>Please go to new registration page.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}
