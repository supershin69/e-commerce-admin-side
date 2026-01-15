"use client"
import { fetchNearOutOfStockProducts } from "@/app/lib/fetchNearOutOfStockProducts";
import { useState, useEffect } from "react"
import TrendCard from "../../trendCard";
import { ProductionQuantityLimits } from "@mui/icons-material";

const NearOutOfStockCard = () => {

    const [productCount, setProductCount] = useState<number>(0);

    useEffect(() => {
        const getUserCount = async () => {
            const count = await fetchNearOutOfStockProducts();
            setProductCount(count * -1);
        };
        getUserCount();
    }, []);

  return (
     <TrendCard 
              icon={<ProductionQuantityLimits sx={{ fontSize: 36}}/>}
              count={productCount}
              label='Products Near Out Of Stock'
            />
  )
}
export default NearOutOfStockCard