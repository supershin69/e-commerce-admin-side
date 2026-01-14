import { supabase } from "./supabaseClient";

export const fetchPendingOrders = async () => {
    const { count, error } = await supabase.from('orders').select("*", { count: 'exact', head: true }).eq('status', 'pending');

    if (error) {
        console.log("Error: ", error)
        return 0
    }

    return count || 0;
}