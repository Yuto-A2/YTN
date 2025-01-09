import "./register.css";
import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { useRouter } from 'next/router'
import Header from "../../../components/Header/Header"
import Footer from "../../../components/Footer/Footer"

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const router = useRouter();

    const doRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) throw new Error(error.message);
            const { error: updateError } = await supabase.auth.updateUser({
                data: { userName },
            });

            if (updateError) throw new Error(updateError.message);

            console.log("User registered:", data.user);
            router.push('/MyPage/MyPage');
        } catch (err: unknown) {
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <div className="main">
                <div className="signPageContainer">
                    <p className="signupLetter">Sign up</p>
                    <div className="signupPageBox">
                        <p className="signupExplanation1">If you log in, you can record your score.</p>
                        <p className="signupExplanation2">That will be easy to review exercises.</p>
                    </div>
                </div>

                <div className="signupContainer">
                    <div className="signupFormContainer">
                        <form className="signUpForm" onSubmit={doRegister}>
                            <div className="formGroup">
                                <label htmlFor="userName">User Name</label>
                                <input
                                    name="userName"
                                    id="userName"
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
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
                                    placeholder="Over 6 characters or numbers"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="confirmPsw">Confirm Password</label>
                                <input
                                    name="confirmPsw"
                                    id="confirmPsw"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="formBtn">
                                <button className="btn" type="submit">Create an account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}