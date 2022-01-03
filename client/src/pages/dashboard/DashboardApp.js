import { useEffect, useState } from 'react';


// material
import { Box, Grid, Container, Typography } from '@mui/material';
import palette from '../../theme/palette';


// components
import Page from '../../components/Page';
import CustomDashboardBox from '../../components/CustomDashboardBox';
import CustomDashboardCard from '../../components/CustomDashboardCard';


// Utils
import {getDashboardInfo} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

export default function DashboardApp() {

  let logininfo = JSON.parse(getFromStorage('logininfo'));

  let [isLoading,setIsLoading] = useState(false);
  let [dashboardInfoError,setDashboardInfoError] = useState(false);
  let [dashboardInfo,setDashboardInfo] = useState(false);


  useEffect( () => {

    loadDashboardInfo();

  },[])


  let loadDashboardInfo = () => {

    setIsLoading(true);

    getDashboardInfo(
      logininfo.Prk_Gym_AutoID
    ).then((result) => {
      console.log(result.data.data);
      setIsLoading(false);
      setDashboardInfo(result.data.data)
    }).catch((error) => {
      setDashboardInfoError(true);
      console.log(error.response);
      errorNotifyByErrorObject(error);
    })

  }


  return (
    <Page title= {"Dashboard | " + logininfo.Str_GymName}>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}> 
          <Typography variant="h3" sx={{ mb: 5 }}>Hi {logininfo.Str_GymName}! Welcome back</Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.success}>
                <CustomDashboardCard title={"Students"} value={dashboardInfo.activeStudentCount} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.error}>
                <CustomDashboardCard title={"Courses"} value={dashboardInfo.activeStudentCount} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.info}>
                <CustomDashboardCard title={"Monthly Income"} value={dashboardInfo.activeStudentCount} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.warning}>
                <CustomDashboardCard title={"Total Reminder"} value={dashboardInfo.activeStudentCount} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Upcoming Seassion</Typography>
            <CustomDashboardBox color={palette.success}/>
          </Grid>


          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Need to enroll</Typography>
            <CustomDashboardBox  color={palette.error}/>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Debtor Students</Typography>
            <CustomDashboardBox color={palette.info}/>
          </Grid>

        </Box>
      </Container>
    </Page>
  );
}
