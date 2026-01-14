import { supabase } from "./supabaseClient";

export const fetchUserCount = async () => {
    const { count, error } = await supabase.from('profiles').select("*", { count: 'exact', head: true});

    if (error) {
        console.log("Error: ", error);
        return 0;
    }

    return count || 0;
}