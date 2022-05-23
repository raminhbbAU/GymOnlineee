import { useState,useEffect } from 'react';

// material
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button,TextField,Divider,Stack, Radio, RadioGroup,Autocomplete, FormControlLabel } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


// components


// utils / API
import {getCourseByTrainerID,getCourseByGymID, getStudentEnrolledCoursesByCourseID,registerStudentAttendance} from "../../api";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";
import {getFromStorage} from "../../storage/localstorage.js";



export default function CheckInIndividualDialog({open,handleClose}) {


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));  

    let {loginType,loginId} = JSON.parse(getFromStorage('logininfo'));
    const [curDate,setCurDate] = useState(new Date().toISOString().split('T')[0]);
    const [curCourse,setCurCourse] = useState(null);
    const [curStudent,setCurStudent] = useState(null);
    const [status,setStatus] = useState("1");

    const [isLoading,setIsLoading] = useState(false);
    const [courseList,setCourseList] = useState([]);
    const [studentlist,setStudentList] = useState([]);


    const handleCurDateChange = (newValue) => {
        let newDate = newValue.toISOString().split('T')[0];
        setCurDate(newDate);        
    };


    useEffect( () => {
        getCourseList();
    },[])


    const getCourseList = () => {

        switch (loginType) {
            case 'trainer':
              getCourseByTrainerID(
                loginId
              ).then((result) => {
                console.log(result);
                setCourseList(result.data.data)
                getStudentList(result.data.data[0].Prk_Course)
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
              })
              break;
            default:
              getCourseByGymID(
                loginId
              ).then((result) => {
                console.log(result);
                setCourseList(result.data.data)
                getStudentList(result.data.data[0].Prk_Course)
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
              })
              break;
          }

    }

    const getStudentList = (CourseId) => {

        getStudentEnrolledCoursesByCourseID(
            CourseId
          ).then((result) => { 
             console.log(result);
             setStudentList(result.data.data);
             setCurStudent(result.data.data[0])
             setIsLoading(true)
          }).catch((error) => {
            console.log(error.response);
            errorNotifyByErrorObject(error);
          })  

    }

    const handleSubmit = () => {

        registerStudentAttendance(
            curStudent.Prk_StudentVCourse,
            curCourse.Prk_Course,
            curDate,
            status,
            '', //AbsentReason
            '' // TrainerNote
          ).then((result) => {      
            console.log(result);                        
            handleClose();
          }).catch((error) => {
            console.log(error.response);
            errorNotifyByErrorObject(error);
          })   

    }

    return (

        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>

        <DialogTitle>Individual Check-In</DialogTitle>

        {isLoading && (
            <DialogContent>     

                <Stack spacing={1}>

                <DialogContentText  margin="normal">
                    In this dialog you can set an specific student checkIn status. Please Make sure you choose the correct date. 
                </DialogContentText>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        fullWidth
                        id="curDate"
                        name="curDate"
                        label="Date"
                        inputFormat="MM/dd/yyyy"
                        value={curDate}
                        onChange={handleCurDateChange}                 
                        renderInput={(params) => <TextField {...params} />}
                        margin="normal"
                    />                                    
                </LocalizationProvider>

                <Divider/>

                <Autocomplete
                    disablePortal
                    id="Course"
                    options={courseList}
                    getOptionLabel={(option) => option.Str_CourseName}
                    value={curCourse}
                    key={option => option.Prk_Course}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Course" />}
                    onChange={(event, newValue) => {
                        setCurCourse(newValue)
                        setCurStudent(null)
                        setIsLoading(false);
                        getStudentList(newValue.Prk_Course)
                    }}
                />


                <Autocomplete
                    disablePortal
                    id="Student"
                    options={studentlist}
                    getOptionLabel={(option) => option.Str_Name + ' ' + option.Str_family}
                    value={curStudent}
                    key={option => option.Prk_Student_AutoID}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Student" />}
                    onChange={(event, newValue) => {
                        setCurStudent(newValue)
                    }}
                />


                <Divider/>
            
                <RadioGroup row aria-label="status" defaultValue="1" onChange={ (e) => setStatus(e.target.value)}>
                     <FormControlLabel value="1" control={<Radio />} label="present" color="success"/>
                     <FormControlLabel value="2" control={<Radio />} label="Absent" color="error"/>
                     <FormControlLabel value="3" control={<Radio />} label="AcceptableAbsence" color="info"/>
                </RadioGroup>

                </Stack>

            </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>

      </Dialog>
    )

}