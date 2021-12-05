import { useState } from "react";
import { useFormik} from 'formik';
import {courseRegisterSchema} from '../../utils/yup.validation';


// material
import {TextField,Button,Stack,Container,Typography} from '@mui/material';


// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import API from "../../api/course";

export default function CourseForm () {

    const gymID =1;
    const trainerID=1;

    const formik = useFormik({
        initialValues: {
            CourseName:'' ,
            CourseDescription:'',
            StartDate:'',
            EndDate:'',
            TrainerPercent:0,
            CourseType:1,
            PerSessionCost:0,
        }, 
        validationSchema: courseRegisterSchema,
        onSubmit: (values) => {
            
            API.registerNewCourse(
                gymID,
                values.CourseName,
                values.CourseDescription,
                trainerID,
                true,//values.Active,
                values.StartDate,
                values.EndDate,
                values.TrainerPercent,
                values.CourseType,
                values.PerSessionCost
              ).then((result) => {
                console.log(result);
              }).catch((error) => {
                console.log(error.response);
              })

        },
    });


    return (
        <Page title="New Course | GymOnlineee">
          <Container>
            
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Add New Course
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
                        />

                        <TextField
                            fullWidth
                            id=" TrainerPercent"
                            name=" TrainerPercent"
                            label=" Trainer Percent"
                            value={formik.values. TrainerPercent}
                            onChange={formik.handleChange}
                            error={formik.touched. TrainerPercent && Boolean(formik.errors. TrainerPercent)}
                            helperText={formik.touched. TrainerPercent && formik.errors. TrainerPercent}
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
                        />

                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
              </Scrollbar>
          </Container>
        </Page>
      );



}