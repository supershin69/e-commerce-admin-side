import { supabase } from "./supabaseClient";

export const fetchNearOutOfStockProducts = async () => {
    const { count, error } = await supabase.from('product_variants').select("*", { count: 'exact', head: true }).lt('quantity', 10);

    if (error) {
        console.log("Error: ", error)
        return 0;
    }

    return count || 0;
}