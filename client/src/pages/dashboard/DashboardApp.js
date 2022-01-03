// material
import { Box, Grid, Container, Typography } from '@mui/material';
import palette from '../../theme/palette';

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
          <Typography variant="h3" sx={{ mb: 5 }}>Hi {logininfo.Str_GymName}! Welcome back</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Students"} value={50} color={palette.success} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Courses"} value={50} color={palette.error} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Monthly Income"} value={50} color={palette.info} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox title={"Total Reminder"} value={50} color={palette.warning}/>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Upcoming Events</Typography>
            <CustomDashboardBox title={"Total Reminder"} value={50} color={palette.warning}/>
          </Grid>


          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Debtor Students</Typography>
            <CustomDashboardBox title={"Total Reminder"} value={50} color={palette.warning}/>
          </Grid>

        </Box>
      </Container>
    </Page>
  );
}
