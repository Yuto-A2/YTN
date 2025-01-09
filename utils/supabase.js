import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
)

const fetchData = async () => {
    const { data, error } = await supabase.from('auth.users').select('*');
    if (error) console.error(error);
    return data;
};

export default fetchData;