// app/dashboard/analytics/page.tsx
import { Container, Paper, Typography } from '@mui/material';

export default function AnalyticsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body1">
        Analytics page with the same AppBar and Drawer.
      </Typography>
    </Container>
  );
}