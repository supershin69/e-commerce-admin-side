import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface TrendCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  
}

const TrendCard: React.FC<TrendCardProps> = ({ icon, count, label }) => {

    const isPositive = count>=0;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 3}}>
    <Paper elevation={3} sx={{ 
        p: 2, 
        borderRadius: 4, 
        minHeight: 114, 
        display: 'flex', 
        alignItems: 'center',
        background: isPositive
        ? 'radial-gradient(circle at top left, rgba(56, 142, 60, 0.2), rgba(56, 142, 60, 0.05) 40%, rgba(56, 142, 60, 0.01) 70%)'
        : 'radial-gradient(circle at top left, rgba(211, 47, 47, 0.2), rgba(211, 47, 47, 0.05) 40%, rgba(211, 47, 47, 0.01) 70%)'
    }}>
      <Grid container alignItems="center" spacing={6}>
        <Grid >
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'transparent',
              color: isPositive ? 'success.main' : 'error.main',
              borderRadius: 2,
            }}
          >
            {icon}
          </Box>
        </Grid>

        <Grid>
          <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
            <Typography variant="h5" fontWeight="bold">
              {Math.abs(count)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </Grid>
  );
};

export default TrendCard;
