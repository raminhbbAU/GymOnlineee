import { useEffect, useState } from 'react';


// material
import { Box, Grid, Container, Typography } from '@mui/material';
import palette from '../../theme/palette';


// Utils
import {getGymDashboardInfo,getStudentDashboardInfo,getTrainerDashboardInfo,getUpcomingSessionsByGymID,getUpcomingSessionsByStudentID,getUpcomingSessionsByTrainerID,getNeedToEnrolStudentListByGymID, getNeedToEnrolStudentListByStudentID, getNeedToEnrolStudentListByTrainerID,getDebtorStudentListByGymID,getDebtorStudentListByStudentID,getDebtorStudentListByTrainerID} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";
import {DashboardCourse_HEAD,DashboardEnrollStudent_HEAD,DashboardDebtorStudent_HEAD} from "../../utils/gridHeader";

// components
import Page from '../../components/Page';
import CustomDashboardBox from '../../components/CustomDashboardBox';
import CustomDashboardCard from '../../components/CustomDashboardCard';
import CustomDashboardGrid from '../../components/CustomDashboardGrid';

// Constants
const gymDashboardBoxes = [
  {id:0, title:'Students',dataField:'activeStudentCount',postfix:''},{id:1, title:'Courses',dataField:'activeCourseCount',postfix:''},
  {id:2, title:'Monthly Income',dataField:'monthlyIncome',postfix:' $'},{id:3, title:'Total Reminder',dataField:'totalReminder',postfix:' $'}
]

const studentDashboardBoxes = [
  {id:0, title:'Courses',dataField:'activeCourseCount',postfix:''},{id:1, title:'Total Debt',dataField:'totalDebt',postfix:' $'},
  {id:2, title:'BMI',dataField:'latestBMI',postfix:''},{id:3, title:'Weight',dataField:'latestWeight',postfix:' kg'}
]

const trainerDashboardBoxes = [
  {id:0, title:'Students',dataField:'activeStudentCount',postfix:''},{id:1, title:'Courses',dataField:'activeCourseCount',postfix:''},
  {id:2, title:'Monthly Income',dataField:'monthlyIncome',postfix:' $'},{id:3, title:'Total Reminder',dataField:'totalReminder',postfix:' $'}
]



export default function DashboardApp() {

  let logininfo = JSON.parse(getFromStorage('logininfo'));

  let [isLoading,setIsLoading] = useState(false);
  let [dashboardInfoError,setDashboardInfoError] = useState(false);
  let [dashboardInfo,setDashboardInfo] = useState({});
  let [dashboardBoxes,setDashboardBoxes] = useState(gymDashboardBoxes);

  let [isUpcomingSessionsLoading,setIsUpcomingSessionsLoading] = useState(false);
  let [UpcomingSessionsError,setUpcomingSessionsError] = useState(false);
  let [upcomingSessions,setUpcomingSessions] = useState([]);

  let [isEnrolStudentListLoading,setIsEnrolStudentListLoading] = useState(false);
  let [enrolStudentListError,setEnrolStudentListError] = useState(false);
  let [enrolStudentList,setEnrolStudentList] = useState([]);


  let [isDebtorStudentListLoading,setIsDebtorStudentListLoading] = useState(false);
  let [debtorStudentListError,setdebtorStudentListError] = useState(false);
  let [debtorStudentList,setDebtorStudentList] = useState([]);


  useEffect( () => {

    loadDashboardInfo();
    loadUpcomingSessions();
    loadNeedtoEnrolStudentList();
    loadDebtorStudentList();

  },[])


  let loadDashboardInfo = () => {

    setIsLoading(true);

    switch (logininfo.loginType) {
      case 'gym':
        getGymDashboardInfo(
          logininfo.loginId
        ).then((result) => {
          console.log(result.data.data);
          setIsLoading(false);
          setDashboardInfo(result.data.data);
          setDashboardBoxes(gymDashboardBoxes);
        }).catch((error) => {
          setDashboardInfoError(true);
          console.log(error.response);
          errorNotifyByErrorObject(error);
          setIsLoading(false);
        })
        break;
      case 'student':
        getStudentDashboardInfo(
          logininfo.loginId
        ).then((result) => {
          setIsLoading(false);
          setDashboardInfo(result.data.data)
          setDashboardBoxes(studentDashboardBoxes);
        }).catch((error) => {
          setDashboardInfoError(true);
          console.log(error.response);
          errorNotifyByErrorObject(error);
          setIsLoading(false);
        })
        break;
      case 'trainer':
        getTrainerDashboardInfo(
          logininfo.loginId
        ).then((result) => {
          console.log(result.data.data);
          setIsLoading(false);
          setDashboardInfo(result.data.data);
          setDashboardBoxes(trainerDashboardBoxes);
        }).catch((error) => {
          setDashboardInfoError(true);
          console.log(error.response);
          errorNotifyByErrorObject(error);
          setIsLoading(false);
        })
        break;
      default:
        setDashboardInfoError(true);
        break;
    }



  }

  let loadUpcomingSessions = () => {

    setIsUpcomingSessionsLoading(true);

    switch (logininfo.loginType) {
      case 'gym':
        getUpcomingSessionsByGymID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsUpcomingSessionsLoading(false);   
          setUpcomingSessions(result.data.data)
        }).catch((error) => {
          console.log(error);
          setUpcomingSessionsError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      case 'student':
        getUpcomingSessionsByStudentID(
          logininfo.loginId
        ).then((result) => {
          setIsUpcomingSessionsLoading(false);   
          setUpcomingSessions(result.data.data)
        }).catch((error) => {
          console.log(error);
          setUpcomingSessionsError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      case 'trainer':
        getUpcomingSessionsByTrainerID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsUpcomingSessionsLoading(false);   
          setUpcomingSessions(result.data.data)
        }).catch((error) => {
          console.log(error);
          setUpcomingSessionsError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      default:
        setUpcomingSessionsError(true);
        break;
    }



  }

  let loadNeedtoEnrolStudentList = () => {

    setIsEnrolStudentListLoading(true);

    switch (logininfo.loginType) {
      case 'gym':
        getNeedToEnrolStudentListByGymID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsEnrolStudentListLoading(false);   
          setEnrolStudentList(result.data.data)
        }).catch((error) => {
          console.log(error);
          setEnrolStudentListError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      case 'student':
        getNeedToEnrolStudentListByStudentID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsEnrolStudentListLoading(false);   
          setEnrolStudentList(result.data.data)
        }).catch((error) => {
          console.log(error);
          setEnrolStudentListError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      case 'trainer':
        getNeedToEnrolStudentListByTrainerID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsEnrolStudentListLoading(false);   
          setEnrolStudentList(result.data.data)
        }).catch((error) => {
          console.log(error);
          setEnrolStudentListError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      default:
        setEnrolStudentListError(true);
        break;
    }

  }

  let loadDebtorStudentList = () => {

    setIsDebtorStudentListLoading(true);

    switch (logininfo.loginType) {
      case 'gym':
        getDebtorStudentListByGymID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsDebtorStudentListLoading(false);   
          setDebtorStudentList(result.data.data)
        }).catch((error) => {
          console.log(error);
          setdebtorStudentListError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      case 'student':
        getDebtorStudentListByStudentID(
          logininfo.loginId
        ).then((result) => {
          console.log(result);
          setIsDebtorStudentListLoading(false);   
          setDebtorStudentList(result.data.data)
        }).catch((error) => {
          console.log(error);
          setdebtorStudentListError(true);      
          errorNotifyByErrorObject(error);
        })
        break;
      case 'trainer':
        setdebtorStudentListError(true);
        break;
      default:
        setdebtorStudentListError(true);      
        break;
    }



  }

  return (
    <Page title= {"Dashboard | " + logininfo.loginName}>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}> 
          <Typography variant="h3" sx={{ mb: 5 }}>Hi {logininfo.loginName}! Welcome back</Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.success}>
                <CustomDashboardCard title={dashboardBoxes[0].title} value={dashboardInfo[dashboardBoxes[0].dataField] + dashboardBoxes[0].postfix} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.error}>
                <CustomDashboardCard title={dashboardBoxes[1].title} value={dashboardInfo[dashboardBoxes[1].dataField] + dashboardBoxes[1].postfix} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.info}>
                <CustomDashboardCard title={dashboardBoxes[2].title} value={dashboardInfo[dashboardBoxes[2].dataField] + dashboardBoxes[2].postfix} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CustomDashboardBox color={palette.warning}>
                <CustomDashboardCard title={dashboardBoxes[3].title} value={dashboardInfo[dashboardBoxes[3].dataField] + dashboardBoxes[3].postfix} isLoading={isLoading} isError={dashboardInfoError}/>
              </CustomDashboardBox>
            </Grid>

          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Upcoming Sessions</Typography>
            <CustomDashboardBox color={palette.success}>
                <CustomDashboardGrid TABLE_HEAD={DashboardCourse_HEAD} dataList={upcomingSessions} idFieldName={"Prk_Course"} isLoading={isUpcomingSessionsLoading} isError={UpcomingSessionsError} />
            </CustomDashboardBox>
          </Grid>


          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Need to enroll</Typography>
            <CustomDashboardBox  color={palette.error}>
                <CustomDashboardGrid TABLE_HEAD={DashboardEnrollStudent_HEAD} dataList={enrolStudentList} idFieldName={"Prk_StudentVCourse"} isLoading={isEnrolStudentListLoading} isError={enrolStudentListError} />
            </CustomDashboardBox>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Debtor Students</Typography>
            <CustomDashboardBox color={palette.info}>
                <CustomDashboardGrid TABLE_HEAD={DashboardDebtorStudent_HEAD} dataList={debtorStudentList} idFieldName={"Prk_Student_AutoID"} isLoading={isDebtorStudentListLoading} isError={debtorStudentListError} />
            </CustomDashboardBox>
          </Grid>

        </Box>
      </Container>
    </Page>
  );
}
