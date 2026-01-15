import { supabase } from "./supabaseClient";
import LowStockItem from "../models/lowStockModel";



export const fetchLowStockItems = async (): Promise<LowStockItem[]> => {
    const { data, error } = await supabase.from('product_variants').select('id, sku, quantity, created_at, updated_at').lt('quantity', 10);

    if (error) {
        console.log("Error fetching low stock items:", error);
        return [];
    }

    return data || [];    
}