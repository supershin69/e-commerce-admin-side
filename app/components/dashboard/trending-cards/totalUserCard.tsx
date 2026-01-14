"use client"
import { fetchUserCount } from "@/app/lib/fetchUserCount";
import { useState, useEffect } from "react"
import TrendCard from "../../trendCard";
import { Person } from "@mui/icons-material";

const TotalUserCard = () => {

    const [userCount, setUserCount] = useState<number>(0);

    useEffect(() => {
        const getUserCount = async () => {
            const count = await fetchUserCount();
            setUserCount(count);
        };
        getUserCount();
    }, []);

  return (
     <TrendCard 
              icon={<Person sx={{ fontSize: 36}}/>}
              count={userCount}
              label='Total Users'
            />
  )
}
export default TotalUserCard