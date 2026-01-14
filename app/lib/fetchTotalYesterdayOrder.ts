import { supabase } from "./supabaseClient";

export const fetchYesterdayOrderCount = async () => {
    const startofToday = new Date();
    startofToday.setHours(0, 0, 0, 0);
    
    const startOfYesterday = new Date(startofToday);
    startOfYesterday.setDate(startofToday.getDate() - 1);

    const { count, error } = await supabase
                                    .from('orders')
                                    .select('*', { count: 'exact', head: true })
                                    .gte('created_at', startOfYesterday.toISOString())
                                    .lt('created_at', startofToday.toISOString());

    if (error) {
        console.error("Error fetching yesterday's order count:", error);
        return 0;
    }

    return count || 0;
};