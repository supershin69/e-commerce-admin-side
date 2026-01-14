"use client";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import OrderComparisonCard from './trending-cards/orderComparisonCard';
import TotalUserCard from './trending-cards/totalUserCard';
import PendingOrderCount from './trending-cards/pendingOrderCount';
import NearOutOfStockCard from './trending-cards/nearOutOfStockCard';


export default function GridCollection() {
  

  return (
    <Container maxWidth="xl" sx={{ mb: 4}}>
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <OrderComparisonCard/>
        <TotalUserCard/>
        <PendingOrderCount/>
        <NearOutOfStockCard/>
      </Grid>
    </Box>
    </Container>
   
  );
}