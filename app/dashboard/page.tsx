"use client"
import { Typography } from "@mui/material"
import PendingOrderTable from "../components/dashboard/PendingOrderTable"
import GridCollection from "../components/dashboard/topGridCollection"
import LowStockItems from "../components/dashboard/LowStockItems"

const Dashboard = () => {
  return (
    <>
      <GridCollection/>
      <Typography variant="h5" sx={{ my: 2}}>Low Stock Items</Typography>
      <LowStockItems/>
    </>
  )
}
export default Dashboard