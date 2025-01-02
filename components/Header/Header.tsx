// import Nav from "./Nav"
import "./Header.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/router';

export default function Header() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session !== null) {
      const { data: userData } = await supabase.auth.getUser();
      const userName = userData?.user?.user_metadata?.userName ?? null;
      setCurrentUser(userName);
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  // Logout
  const doLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    router.reload();
  };

  return (
    <>
      <header id="header">
        <div className="titleContainer">
          <Link href="/" className="homePage">
            <h1 id="siteTitle">YTN</h1>
            <img id="logoImg" src="/logo.jpg" alt="J-Goal's logo" />
          </Link>

          {!currentUser ? (
            <>
              <Link href="/Register/Register">
                <button className="signUp">Sign up</button>
              </Link>
              <Link href="/Login/Login">
                <button className="logIn">Log in</button>
              </Link>
            </>) : (
            <button className="logOut" onClick={() => doLogout()}>Logout&#8594;</button>)}
        </div>
      </header>
    </>
  );
}
