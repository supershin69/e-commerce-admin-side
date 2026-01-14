"use client";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { fetchTodayOrderCount } from '../lib/fetchTotalOrdersToday';
import StatCard from '../components/displayStatCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Container } from '@mui/material';
import { fetchYesterdayOrderCount } from '../lib/fetchTotalYesterdayOrder';
import { getOrderCountComparison } from '../lib/getOrderCountComparison';
import OrderComparisonCard from '../components/dashboard/orderComparisonCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function BasicGrid() {
  

  return (
    <Container maxWidth="xl">
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
          
           <OrderComparisonCard/>
         
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
        
            <StatCard
             icon={<TrendingUpIcon />}
             count={12}
             label="Today's Orders"
             comparison={15}
            />
          
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3}}>
         
            <StatCard
             icon={<TrendingUpIcon />}
             count={13}
             label="Today's Orders"
             comparison={15}
            />
       
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md:3 }}>
        
            <StatCard
             icon={<TrendingUpIcon />}
             count={15}
             label="Today's Orders"
             comparison={15}
            />
       
        </Grid>
      </Grid>
    </Box>
    </Container>
   
  );
}