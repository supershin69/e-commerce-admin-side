import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from '@mui/icons-material';

interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  comparison: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, count, label, comparison }) => {
  const isPositive = comparison >= 0;

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
      <Grid container alignItems="center" spacing={6}>
        <Grid >
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
            }}
          >
            {icon}
          </Box>
        </Grid>

        <Grid>
          <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
            <Typography variant="h5" fontWeight="bold">
              {count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {isPositive ? <TrendingUpIcon
                fontSize="small"
                color="success"
              /> : <TrendingDown
                fontSize='small'
                color='error'
              />}
              <Typography
                variant="body2"
                color={isPositive ? 'success.main' : 'error.main'}
                ml={0.5}
              >
                {Math.abs(comparison)}%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StatCard;
