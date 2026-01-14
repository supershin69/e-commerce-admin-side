"use client"
import PendingOrderTable from "../components/dashboard/PendingOrderTable"
import GridCollection from "../components/dashboard/topGridCollection"

const Dashboard = () => {
  return (
    <>
      <GridCollection/>
      <PendingOrderTable/>
    </>
  )
}
export default Dashboard