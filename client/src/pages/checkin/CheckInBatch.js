import { useState,useEffect } from 'react';

// material
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button,TextField,Typography, Divider,Stack,TableContainer,Table,TableHead,TableBody,TableRow, TableCell, Radio, RadioGroup,FormControlLabel} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// components
import Scrollbar from '../../components/Scrollbar';

// utils / API
import API_Student from "../../api/student";
import {delay} from "../../utils/utility"

export default function CheckInBatchDialog({open,handleClose,courseName,courseId}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));  
    const [curDate,setCurDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading,setIsLoading] = useState(false);
    const [studentlist,setStudentList] = useState(false);
    const [dataset,setDataset] = useState([]);

    const handleCurDateChange = (newValue) => {

        let newDate = newValue.toISOString().split('T')[0];
        setCurDate(newDate);
        
        if (dataset){
            dataset.map((itm) => {
                itm.Str_Date = newDate;
            })

            console.log(dataset);
        }
     
    };


    useEffect( () => {

        API_Student.getStudentEnrolledCoursesByCourseID(
                courseId
              ).then((result) => { 
                 setStudentList(result.data.data);
                 dataSetPreperation(result.data.data);
              }).catch((error) => {
                console.log(error.response);
              })   
      },[])


    const dataSetPreperation = (list) => {

        if (list){

            list.map((student) => {

                let data = {"Frk_StudentVCourse":student.Prk_StudentVCourse,"Frk_Course":student.Prk_Course,"Str_Date":curDate,"Str_Name":student.Str_Name,"Str_family": student.Str_family,"Int_Status":1,"Str_AbsentReason":"","Str_TrainerNote":""};
                dataset.push(data)
    
            })
    
            setIsLoading(true);
        }
    }

    const handleSubmit = () => {

        API_Student.batchRegisterStudentAttendance(
            dataset,
            curDate,
            courseId
          ).then((result) => {      
            console.log(result);                        
            handleClose();
          }).catch((error) => {
            console.log(error.response);
          })   

    }

    const handleRadioChanges = (data,value) => {
        data.Int_Status = value;
    }

    return (

        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>

        <DialogTitle>Batch Check-In [{courseName}]</DialogTitle>

        {isLoading && (
            <DialogContent>     

                <Stack spacing={1}>

                <DialogContentText  margin="normal">
                    In this dialog you can see all enrolled students in order to save their absent or present status. Please Make sure you choose the correct date. 
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
            
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Present / Absent / AcceptableAbsence</TableCell>                       
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataset.map((data) => {
                                const {Prk_StudentVCourse,Str_Name,Str_family} = data;

                                return (
                                    <TableRow hover key={Prk_StudentVCourse}>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography variant="subtitle2" noWrap>
                                                    {Str_Name + ' ' + Str_family}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <RadioGroup row aria-label="status" defaultValue="1" onChange={ (e) => handleRadioChanges(data,e.target.value)}>
                                                <Radio value="1" label="present" color="success"/>
                                                <Radio value="2" label="Absent" color="error"/>
                                                <Radio value="3" label="AcceptableAbsence" color="info"/>
                                            </RadioGroup>
                                        </TableCell>

                                    </TableRow>
                                )

                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

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