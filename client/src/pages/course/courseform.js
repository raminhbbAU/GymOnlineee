import { useState,useEffect } from "react";
import { useFormik} from 'formik';
import {courseRegisterSchema} from '../../utils/yup.validation';
import { useNavigate,useParams } from 'react-router-dom';

// material
import {TextField,Button,Stack,Container,Typography,MenuItem} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {getCourseInfoByID,getTrainerByGymID,editCourse,registerNewCourse} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

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
            StartDate:'',
            EndDate:'',
            TrainerPercent:0,
            CourseType:1,
            PerSessionCost:0,
            Trainer:0,
        }, 
        validationSchema: courseRegisterSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDateChange = (filedName,newValue) => {
      formik.setFieldValue(filedName, newValue.toISOString().split('T')[0]);
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
                values.PerSessionCost
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
                values.PerSessionCost
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
                                       id="CourseType"
                                       name="CourseType"
                                       label="Course Type"
                                       value={formik.values.CourseType}
                                       onChange={formik.handleChange}
                                       error={formik.touched.CourseType && Boolean(formik.errors.CourseType)}
                                       helperText={formik.touched.CourseType && formik.errors.CourseType}
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