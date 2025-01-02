import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import "./MyPage.css";
import { useRouter } from 'next/router';

const MyPage = () => {
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

    useEffect(() => {
        if (!loading && currentUser === null) {
            router.push('/Login/Login');  
        }
    }, [currentUser, loading]);

    return (
        <div>
            {loading ? (  
                <div>Loading...</div>
            ) : currentUser ? (
                <>
                    <p className="welcomeUser">Welcome {currentUser}</p>
                </>
            ) : (
                <div suppressHydrationWarning={true}>Not Logged In</div>
            )}
        </div>
    );
};

export default MyPage;
