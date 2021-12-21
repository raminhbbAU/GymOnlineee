import { useState,useEffect } from "react";
import { useFormik} from 'formik';
import {courseRegisterSchema} from '../../utils/yup.validation';
import { useNavigate,useParams } from 'react-router-dom';

// material
import {TextField,Button,Stack,Container,Typography,MenuItem} from '@mui/material';


// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {apiCourse,apiTrainer} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";


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

            apiCourse.getCourseInfoByID(
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
              })
        }
        else
        {
            loadTrainerList();
            
        }       

      },[])


    const loadTrainerList = () => {
    

      apiTrainer.getTrainerByGymID(
        Prk_Gym_AutoID
      ).then((result) => {
            
        setTrainerList(result.data.data)
        setIsLoading(true);           

      }).catch((error) => {
        console.log(error.response);
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


    const handleSubmit = (values) => {

        if (editMode)
        {
              apiCourse.editCourse(
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
              })
        }
        else
        {
            apiCourse.registerNewCourse(
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
           
                                   <TextField
                                       fullWidth
                                       id="StartDate"
                                       name="StartDate"
                                       label="Start Date"
                                       value={formik.values.StartDate}
                                       onChange={formik.handleChange}
                                       error={formik.touched.StartDate && Boolean(formik.errors.StartDate)}
                                       helperText={formik.touched.StartDate && formik.errors.StartDate}
                                       margin="normal"
                                   />
           
                                   <TextField
                                       fullWidth
                                       id="EndDate"
                                       name="EndDate"
                                       label="End Date"
                                       value={formik.values.EndDate}
                                       onChange={formik.handleChange}
                                       error={formik.touched.EndDate && Boolean(formik.errors.EndDate)}
                                       helperText={formik.touched.EndDate && formik.errors.EndDate}
                                       margin="normal"
                                   />
           
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