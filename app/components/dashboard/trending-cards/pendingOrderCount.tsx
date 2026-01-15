"use client"
import { fetchPendingOrders } from "@/app/lib/fetchPendingOrders";
import { useState, useEffect } from "react"
import TrendCard from "../../trendCard";
import { AccessTime } from "@mui/icons-material";

const PendingOrderCount = () => {

    const [pendingOrderCount, setPendingOrderCount] = useState<number>(0);

    useEffect(() => {
        const getOrderCount = async () => {
            const count = await fetchPendingOrders();
            setPendingOrderCount(count * -1);
        };
        getOrderCount();
    }, []);

  return (
     <TrendCard 
              icon={<AccessTime sx={{ fontSize: 36}}/>}
              count={pendingOrderCount}
              label='Pending Orders'
            />
  )
}
export default PendingOrderCount