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
import API_Course from "../../api/course";
import API_Student from "../../api/student";
import {getFromStorage} from "../../storage/localstorage.js";


export default function EnrolmentForm ({courseID,studentID}) {

    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [studentlist, setStudentlist] = useState([]);

    
    const navigate = useNavigate();
    let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));
    let { enrolmentID } = useParams();


    useEffect( () => {

        if (enrolmentID)
        {
            setEditMode(true);

            API_Course.getCourseInfoByID(
                courseID
              ).then((result) => {
                              
                // setCourseName(result.data.data.Str_CourseName)
                // formik.setFieldValue('CourseName',result.data.data.Str_CourseName);
                // formik.setFieldValue('CourseDescription',result.data.data.Str_CourseDescription);
                // formik.setFieldValue('StartDate',result.data.data.Str_StartDate);
                // formik.setFieldValue('EndDate',result.data.data.Str_EndDate);
                // formik.setFieldValue('TrainerPercent',result.data.data.Int_TrainerPercent);
                // formik.setFieldValue('CourseType',result.data.data.Int_CourseType);
                // formik.setFieldValue('PerSessionCost',result.data.data.Int_PerSessionCost);
                // formik.setFieldValue('Trainer',result.data.data.Frk_Trainer);
          
                loadCourseList();

              }).catch((error) => {
                console.log(error.response);
              })
        }
        else
        {
          loadCourseList();
            
        }       

      },[])


    const loadCourseList = () => {
    
      API_Course.getCourseByGymID(
        Prk_Gym_AutoID
      ).then((result) => {
        
        console.log(result.data.data);
        setCourseList(result.data.data)
        loadStudentList();           

      }).catch((error) => {
        console.log(error.response);
      })

    }

    const loadStudentList = () => {
    
        API_Student.getStudentInfoByGymID(
          Prk_Gym_AutoID
        ).then((result) => {
          
          console.log(result.data.data);
          setStudentlist(result.data.data)
          setIsLoading(true);           
  
        }).catch((error) => {
          console.log(error.response);
        })
  
      }

    const formik = useFormik({
        initialValues: {
            Course:'' ,
            Student:'',
            RegisteredSession:0,
            ValidUntillTo:'',
        }, 
        //validationSchema: courseRegisterSchema,
        onSubmit: (values) => {
            handleSubmit(values);

        },
    });


    const handleSubmit = (values) => {

        if (editMode)
        {
            API_Student.editCourse(
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
              API_Student.newStudentCourseEnrollment(
                values.Course,
                values.Student,
                values.RegisteredSession,
                values.ValidUntillTo,
              ).then((result) => {
                console.log(result);
                navigate("/gym/enrolment");
              }).catch((error) => {
                console.log(error.response);
              })
        }


    }


    return (
        <Page title="New Enrolment | GymOnlineee">

        {isLoading && (
                       <Container>
            
                       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                         <Typography variant="h4" gutterBottom>
                         {editMode ? `Edit Enrolment [${courseName}]` : 'New Enrolment'}
                         </Typography>
                       </Stack>
           
                       <Scrollbar>
                           <div>
                               <form onSubmit={formik.handleSubmit}>
           
                                  <TextField
                                    fullWidth
                                    id="Course"
                                    name="Course"
                                    select
                                    label="Course"
                                    value={formik.values.Course}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Course && Boolean(formik.errors.Course)}
                                    helperText={formik.touched.Course && formik.errors.Course}
                                    margin="normal"
                                  >
                                    {courseList.map((course) => (
                                      <MenuItem key={course.Prk_Course} value={course.Prk_Course}>
                                        {course.Str_CourseName}
                                      </MenuItem>
                                    ))}
                                  </TextField>
           
                                  <TextField
                                    fullWidth
                                    id="Student"
                                    name="Student"
                                    select
                                    label="Student"
                                    value={formik.values.Student}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Student && Boolean(formik.errors.Student)}
                                    helperText={formik.touched.Student && formik.errors.Student}
                                    margin="normal"
                                  >
                                    {studentlist.map((student) => (
                                      <MenuItem key={student.Prk_Student_AutoID} value={student.Prk_Student_AutoID}>
                                        {student.Str_Name + ' ' + student.Str_Family}
                                      </MenuItem>
                                    ))}
                                  </TextField>
           
                                   <TextField
                                       fullWidth
                                       id="RegisteredSession"
                                       name="RegisteredSession"
                                       label="Registered Session"
                                       value={formik.values.RegisteredSession}
                                       onChange={formik.handleChange}
                                       error={formik.touched.RegisteredSession && Boolean(formik.errors.RegisteredSession)}
                                       helperText={formik.touched.RegisteredSession && formik.errors.RegisteredSession}
                                       margin="normal"
                                   />
           
                                   <TextField
                                       fullWidth
                                       id="ValidUntillTo"
                                       name="ValidUntillTo"
                                       label="Valid Untill To"
                                       value={formik.values.ValidUntillTo}
                                       onChange={formik.handleChange}
                                       error={formik.touched.ValidUntillTo && Boolean(formik.errors.ValidUntillTo)}
                                       helperText={formik.touched.ValidUntillTo && formik.errors.ValidUntillTo}
                                       margin="normal"
                                   />
                                               
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