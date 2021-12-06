// material
import { Box, Grid, Container, Typography } from '@mui/material';

// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------
import {getFromStorage} from "../../storage/localstorage.js";

export default function DashboardApp() {

  let logininfo = JSON.parse(getFromStorage('logininfo'));

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi {logininfo.Str_GymName}! Welcome back</Typography>
        </Box>
      </Container>
    </Page>
  );
}
