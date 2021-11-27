// material
import { Box, Grid, Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function Trainer() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Trainer Page</Typography>
        </Box>
      </Container>
    </Page>
  );
}
