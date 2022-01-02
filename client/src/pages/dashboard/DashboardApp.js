// material
import { Box, Grid, Container, Typography } from '@mui/material';


// components
import Page from '../../components/Page';
import CustomDashboardBox from '../../components/customdashboardbox';


// Utils
import {getFromStorage} from "../../storage/localstorage.js";


export default function DashboardApp() {

  let logininfo = JSON.parse(getFromStorage('logininfo'));

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>Hi {logininfo.Str_GymName}! Welcome back</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Student/Athlete"} value={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Student/Athlete"} value={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Student/Athlete"} value={50} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Student/Athlete"} value={50} />
            </Grid>
          </Grid>

        </Box>
      </Container>
    </Page>
  );
}
