"use client";

import StatCard from "../../displayStatCard";
import { useState, useEffect } from "react";
import { fetchTodayOrderCount } from "@/app/lib/fetchTotalOrdersToday";
import { fetchYesterdayOrderCount } from "@/app/lib/fetchTotalYesterdayOrder";
import { getOrderCountComparison } from "@/app/lib/getOrderCountComparison";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";

const OrderComparisonCard = () => {
    const [todayOrders, setTodayOrders] = useState<number>(0);
    const [yesterdayOrders, setYesterdayOrders] = useState<number>(0);

    useEffect(() => {
        const getTodayOrders = async () => {
        const count = await fetchTodayOrderCount();
        setTodayOrders(count);
        }    
        getTodayOrders();
    }, []);

    useEffect(() => {
        const getYesterdayOrderCount = async () => {
        const count = await fetchYesterdayOrderCount();
        setYesterdayOrders(count);
        }
        getYesterdayOrderCount();
    }, []);

    const percentage = getOrderCountComparison(todayOrders, yesterdayOrders);
  return (
     <StatCard
             icon={percentage >= 0 ? <TrendingUpIcon sx={{ fontSize: 36}}/> : <TrendingDown sx={{ fontSize: 36 }}/>}
             count={todayOrders}
             label="Today's Orders"
             comparison={percentage}
            />
  )
}
export default OrderComparisonCard