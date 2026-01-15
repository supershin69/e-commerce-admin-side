import { supabase } from "./supabaseClient";

export const fetchWaitingOrders = async () => {
    const { data, error } = await supabase.from('orders').select('id, customer_id, status, total_amount, created_at, updated_at').eq('status', 'waiting');
}