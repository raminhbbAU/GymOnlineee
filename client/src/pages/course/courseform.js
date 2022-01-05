import { useState,useEffect } from "react";
import { useFormik} from 'formik';
import {courseRegisterSchema} from '../../utils/yup.validation';
import { useNavigate,useParams } from 'react-router-dom';

// material
import {FormLabel,FormGroup,Checkbox,TextField,Button,Stack,Container,Typography,MenuItem, Radio, RadioGroup, FormControlLabel, Grid, Card} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import { alpha, styled } from '@mui/material/styles';
import palette from '../../theme/palette';


// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {getCourseInfoByID,getTrainerByGymID,editCourse,registerNewCourse} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";
import {getDate,howManyDaysLater} from "../../utils/utility";
import { Box } from "@mui/system";


// Style



export default function CourseForm () {

    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [trainerList, setTrainerList] = useState([]);

    const navigate = useNavigate();
    let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));
    let { courseID } = useParams();


    useEffect( () => {

        if (courseID)
        {
            setEditMode(true);

            getCourseInfoByID(
                courseID
              ).then((result) => {
                              
                setCourseName(result.data.data.Str_CourseName)
                formik.setFieldValue('CourseName',result.data.data.Str_CourseName);
                formik.setFieldValue('CourseDescription',result.data.data.Str_CourseDescription);
                formik.setFieldValue('StartDate',result.data.data.Str_StartDate);
                formik.setFieldValue('EndDate',result.data.data.Str_EndDate);
                formik.setFieldValue('TrainerPercent',result.data.data.Int_TrainerPercent);
                formik.setFieldValue('CourseType',result.data.data.Int_CourseType);
                formik.setFieldValue('PerSessionCost',result.data.data.Int_PerSessionCost);
                formik.setFieldValue('Trainer',result.data.data.Frk_Trainer);
          
                loadTrainerList();

              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
              })
        }
        else
        {
            loadTrainerList();
            
        }       

      },[])


    const loadTrainerList = () => {
    

      getTrainerByGymID(
        Prk_Gym_AutoID
      ).then((result) => {
            
        setTrainerList(result.data.data)
        setIsLoading(true);           

      }).catch((error) => {
        console.log(error.response);
        errorNotifyByErrorObject(error);
      })

    }

    const formik = useFormik({
        initialValues: {
            CourseName:'' ,
            CourseDescription:'',
            StartDate:getDate(),
            EndDate:howManyDaysLater(30),
            TrainerPercent:0,
            CourseType:"1",
            PerSessionCost:0,
            Trainer:0,
            Sunday:false,
            Monday:false,
            Tuesday:false,
            Wednesday:false,
            Thursday:false,
            Friday:false,
            Saturday:false,
            TimeFrom:null,
            TimeTo:null
        }, 
        validationSchema: courseRegisterSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDateChange = (filedName,newValue) => {
      formik.setFieldValue(filedName, newValue.toISOString().split('T')[0]);
    };

    const handleTimeChange = (filedName,newValue) => {
      //console.log(newValue.getHours().toString().padStart(2, '0') + ':' + newValue.getMinutes().toString().padStart(2, '0') + ':' + newValue.getSeconds().toString().padStart(2, '0'));
      formik.setFieldValue(filedName,newValue);
    };

    const handleRadioChanges = (filedName,newValue) => {
      formik.setFieldValue(filedName, newValue);
    };
    

    const handleSubmit = (values) => {

        if (editMode)
        {
              editCourse(
                courseID,
                values.CourseName,
                values.CourseDescription,
                values.Trainer,
                values.StartDate,
                values.EndDate,
                values.TrainerPercent,
                values.CourseType,
                values.PerSessionCost,
                values.Sunday,
                values.Monday,
                values.Tuesday,
                values.Wednesday,
                values.Thursday,
                values.Friday,
                values.Saturday,
                values.TimeFrom.getHours().toString().padStart(2, '0') + ':' + values.TimeFrom.getMinutes().toString().padStart(2, '0') + ':' + values.TimeTo.getSeconds().toString().padStart(2, '0'),
                values.TimeTo.getHours().toString().padStart(2, '0') + ':' + values.TimeTo.getMinutes().toString().padStart(2, '0') + ':' + values.TimeTo.getSeconds().toString().padStart(2, '0'),
              ).then((result) => {
                console.log(result);
                navigate("/gym/course");
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
              })
        }
        else
        {
            registerNewCourse(
                Prk_Gym_AutoID,
                values.CourseName,
                values.CourseDescription,
                values.Trainer,
                true,//values.Active,
                values.StartDate,
                values.EndDate,
                values.TrainerPercent,
                values.CourseType,
                values.PerSessionCost,
                values.Sunday,
                values.Monday,
                values.Tuesday,
                values.Wednesday,
                values.Thursday,
                values.Friday,
                values.Saturday,
                values.TimeFrom.getHours().toString().padStart(2, '0') + ':' + values.TimeFrom.getMinutes().toString().padStart(2, '0') + ':' + values.TimeTo.getSeconds().toString().padStart(2, '0'),
                values.TimeTo.getHours().toString().padStart(2, '0') + ':' + values.TimeTo.getMinutes().toString().padStart(2, '0') + ':' + values.TimeTo.getSeconds().toString().padStart(2, '0'),
              ).then((result) => {
                console.log(result);
                navigate("/gym/course");
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
              })
        }


    }


    return (
        <Page title="New Course | GymOnlineee">

        {isLoading && (
                       <Container>
            
                       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                         <Typography variant="h4" gutterBottom>
                         {editMode ? `Edit Course [${courseName}]` : 'Add New Course'}
                         </Typography>
                       </Stack>
           
                       <Scrollbar>
                           <div>
                               <form onSubmit={formik.handleSubmit}>
           
                                   <TextField
                                       fullWidth
                                       id="CourseName"
                                       name="CourseName"
                                       label="Name"
                                       value={formik.values.CourseName}
                                       onChange={formik.handleChange}
                                       error={formik.touched.CourseName && Boolean(formik.errors.CourseName)}
                                       helperText={formik.touched.CourseName && formik.errors.CourseName}
                                       margin="normal"
                                   />
           
                                   <TextField
                                       fullWidth
                                       id="CourseDescription"
                                       name="CourseDescription"
                                       label="Description"
                                       value={formik.values.CourseDescription}
                                       onChange={formik.handleChange}
                                       error={formik.touched.CourseDescription && Boolean(formik.errors.CourseDescription)}
                                       helperText={formik.touched.CourseDescription && formik.errors.CourseDescription}
                                       margin="normal"
                                   />
           
                                   <Stack sx={{ flexDirection: 'column' }} margin="normal">
                                   
                                      <LocalizationProvider dateAdapter={AdapterDateFns} margin="normal">
                                          <DesktopDatePicker
                                                    fullWidth
                                                    id="StartDate"
                                                    name="StartDate"
                                                    label="Start Date"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={formik.values.StartDate}
                                                    onChange={(value) => handleDateChange('StartDate',value)}
                                                    error={formik.touched.StartDate && Boolean(formik.errors.StartDate)}
                                                    helperText={formik.touched.StartDate && formik.errors.StartDate}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    margin="normal"
                                          />                                    
                                      </LocalizationProvider>

                                      <LocalizationProvider dateAdapter={AdapterDateFns} margin="normal">
                                          <DesktopDatePicker
                                                    fullWidth
                                                    id="EndDate"
                                                    name="EndDate"
                                                    label="End Date"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={formik.values.EndDate}
                                                    onChange={(value) => handleDateChange('EndDate',value)}
                                                    error={formik.touched.EndDate && Boolean(formik.errors.EndDate)}
                                                    helperText={formik.touched.EndDate && formik.errors.EndDate}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    margin="normal"
                                          />                                    
                                      </LocalizationProvider>

                                   </Stack>

           
                                   <TextField
                                       fullWidth
                                       id="TrainerPercent"
                                       name="TrainerPercent"
                                       label="Trainer Percent"
                                       value={formik.values.TrainerPercent}
                                       onChange={formik.handleChange}
                                       error={formik.touched.TrainerPercent && Boolean(formik.errors.TrainerPercent)}
                                       helperText={formik.touched.TrainerPercent && formik.errors.TrainerPercent}
                                       margin="normal"
                                   />
         
                                   <TextField
                                       fullWidth
                                       id="PerSessionCost"
                                       name="PerSessionCost"
                                       label="PerSession Cost"
                                       value={formik.values.PerSessionCost}
                                       onChange={formik.handleChange}
                                       error={formik.touched.PerSessionCost && Boolean(formik.errors.PerSessionCost)}
                                       helperText={formik.touched.PerSessionCost && formik.errors.PerSessionCost}
                                       margin="normal"
                                   />

                                  <TextField
                                    fullWidth
                                    id="Trainer"
                                    name="Trainer"
                                    select
                                    label="Trainer"
                                    value={formik.values.Trainer}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Trainer && Boolean(formik.errors.Trainer)}
                                    helperText={formik.touched.Trainer && formik.errors.Trainer}
                                    margin="normal"
                                  >
                                    {trainerList.map((trainer) => (
                                      <MenuItem key={trainer.Prk_Trainer} value={trainer.Prk_Trainer}>
                                        {trainer.Str_TrainerName + ' ' + trainer.Str_TrainerFamily}
                                      </MenuItem>
                                    ))}
                                  </TextField>


                                  <Box component="div" sx={{border: '1px solid',padding:1,marginTop:2,borderRadius:1,borderColor:palette.primary.main }}>
                                      <FormLabel component="legend" margin="normal">Working Days:</FormLabel>
                                      <Grid container spacing={3} >
                                        <Grid item xs={3} sm={12} md={12}>
                                            <FormControlLabel  control={<Checkbox />} label="Sunday" id="Sunday" name="Sunday" value={formik.values.Sunday} onChange={formik.handleChange}/>
                                            <FormControlLabel  control={<Checkbox />} label="Monday" id="Monday" name="Monday" value={formik.values.Monday} onChange={formik.handleChange}/> 
                                            <FormControlLabel  control={<Checkbox />} label="Tuseday"  id="Tuseday" name="Tuseday" value={formik.values.Tuseday} onChange={formik.handleChange}/> 
                                            <FormControlLabel  control={<Checkbox />} label="Wednesday"  id="Wednesday" name="Wednesday" value={formik.values.Wednesday} onChange={formik.handleChange} /> 
                                            <FormControlLabel  control={<Checkbox />} label="Thursday"  id="Thursday" name="Thursday" value={formik.values.Thursday} onChange={formik.handleChange}/> 
                                            <FormControlLabel  control={<Checkbox />} label="Friday"  id="Friday" name="Friday" value={formik.values.Friday} onChange={formik.handleChange}/> 
                                            <FormControlLabel  control={<Checkbox />} label="Saturday"  id="Saturday" name="Saturday" value={formik.values.Saturday} onChange={formik.handleChange}/> 
                                        </Grid>
                                      </Grid>
                                  </Box>

                                 
                                  <Box component="div"  sx={{border: '1px solid',padding:1,marginTop:2,borderRadius:1,borderColor:palette.primary.main }}>
                                      <FormLabel component="legend" margin="normal">Working Hours:</FormLabel>
                                      <Grid container spacing={3} >
                                        <Grid item xs={12} sm={12} md={12}>

                                              <LocalizationProvider dateAdapter={AdapterDateFns} sx={{marginRight:2}}>
                                                <TimePicker
                                                  id="TimeFrom"
                                                  name="TimeFrom"
                                                  label="From"
                                                  ampm={false}
                                                  value={formik.values.TimeFrom}
                                                  onChange={(value) => handleTimeChange('TimeFrom',value)}
                                                  error={formik.touched.TimeFrom && Boolean(formik.errors.TimeFrom)}
                                                  helperText={formik.touched.TimeFrom && formik.errors.TimeFrom}
                                                  sx={{marginRight:2}}
                                                  renderInput={(params) => <TextField {...params} />}
                                                />
                                              </LocalizationProvider>

                                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <TimePicker
                                                  id="TimeTo"
                                                  name="TimeTo"
                                                  label="To"
                                                  ampm={false}
                                                  value={formik.values.TimeTo}
                                                  onChange={(value) => handleTimeChange('TimeTo',value)}
                                                  error={formik.touched.TimeTo && Boolean(formik.errors.TimeTo)}
                                                  helperText={formik.touched.TimeTo && formik.errors.TimeTo}
                                                  renderInput={(params) => <TextField {...params} />}
                                                />
                                              </LocalizationProvider>                                              

                                        </Grid>
                                      </Grid>
                                  </Box>



                                  <Box component="div" sx={{border: '1px solid',padding:1,marginTop:2,marginBottom:2,borderRadius:1,borderColor:palette.primary.main }}>
                                      <FormLabel component="legend" margin="normal">Course Type:</FormLabel>
                                      <RadioGroup  margin="normal" row aria-label="CourseType" defaultValue={formik.values.CourseType} onChange={(e) => handleRadioChanges('CourseType',e.target.value)}>
                                          <FormControlLabel value={"1"} control={<Radio />} label={"Gym"} />
                                          <FormControlLabel value={"2"} control={<Radio />} label={"Online"} />
                                      </RadioGroup>
                                  </Box>

           
                                   <Button color="primary" variant="contained" fullWidth type="submit" margin="normal">
                                       Submit
                                   </Button>

                               </form>
                           </div>
                         </Scrollbar>
                     </Container>   
        )}

        </Page>
      );



}