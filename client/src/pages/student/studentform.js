import { useState,useEffect } from "react";
import { useFormik} from 'formik';
import {studentRegisterSchema} from '../../utils/yup.validation';
import { useNavigate,useParams } from 'react-router-dom';
import { replace } from "lodash";

// material
import {TextField,Button,InputAdornment,IconButton,Stack,Container,Typography} from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import API from "../../api/student";
import {getFromStorage} from "../../storage/localstorage.js";



export default function StudentForm () {

    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    
    let { studentID } = useParams();
    let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));



    useEffect( () => {

        if (studentID)
        {
            setEditMode(true);

            API.getStudentInfoByStudentID(
                Prk_Gym_AutoID,
                studentID
              ).then((result) => {

                setFullName(result.data.data.Str_Name + ' ' + result.data.data.Str_Family)
                formik.setFieldValue('Name',result.data.data.Str_Name);
                formik.setFieldValue('Family',result.data.data.Str_Family);
                formik.setFieldValue('Mobile',result.data.data.Str_Mobile);
                formik.setFieldValue('WhatsApp',result.data.data.Str_WhatsApp);
                formik.setFieldValue('Telegram',result.data.data.Str_Telegram);
                formik.setFieldValue('Gmail',result.data.data.Str_Gmail);
                formik.setFieldValue('Address',result.data.data.Str_Address);
                formik.setFieldValue('Birthday',result.data.data.Str_Birthday);
                formik.setFieldValue('Description',result.data.data.Str_Description);

                setIsLoading(true);           

              }).catch((error) => {
                console.log(error.response);
              })
        }
        else
        {
            setIsLoading(true);
        }
      },[])


    
    const formik = useFormik({
        initialValues: {
            Name:'' ,
            Family:'',
            Mobile:'',
            WhatsApp:'',
            Telegram:'',
            Gmail:'',
            Address:'',
            Birthday:'',
            Description:''
        }, 
        validationSchema: studentRegisterSchema,
        enableReinitialize:true,
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });


    const handleSubmit = (values) => {

        if (editMode)
        {
            API.editStudentInfo(
                studentID,
                values.Name,
                values.Family,
                values.Mobile,
                values.WhatsApp,
                values.Telegram,
                values.Gmail,
                values.Address,
                values.Birthday,
                values.Description,
              ).then((result) => {
                console.log(result);              
                navigate("/gym/student");
              }).catch((error) => {
                console.log(error.response);
              })
        }
        else
        {
            API.registerNewStudent(
                Prk_Gym_AutoID,
                values.Name,
                values.Family,
                values.Mobile,
                values.WhatsApp,
                values.Telegram,
                values.Gmail,
                values.Address,
                values.Birthday,
                values.Gmail, //default username
                values.Mobile, //default passowrd
                values.Description,
              ).then((result) => {
                console.log(result);              
                navigate("/gym/student");
              }).catch((error) => {
                console.log(error.response);
              })
        }


    }

    return (
        <Page title="New Student | GymOnlineee">

        {isLoading && (
          <Container>
            
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              {editMode ? `Edit Student [${fullName}]` : 'Add New Student'}
            </Typography>
          </Stack>

          <Scrollbar>
              <div>
                  <form onSubmit={formik.handleSubmit}>

                      <TextField
                          fullWidth
                          id="Name"
                          name="Name"
                          label="Name"
                          value={formik.values.Name}
                          onChange={formik.handleChange}
                          error={formik.touched.Name && Boolean(formik.errors.Name)}
                          helperText={formik.touched.Name && formik.errors.Name}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="Family"
                          name="Family"
                          label="Family"
                          value={formik.values.Family}
                          onChange={formik.handleChange}
                          error={formik.touched.Family && Boolean(formik.errors.Family)}
                          helperText={formik.touched.Family && formik.errors.Family}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="Mobile"
                          name="Mobile"
                          label="Mobile"
                          value={formik.values.Mobile}
                          onChange={formik.handleChange}
                          error={formik.touched.Mobile && Boolean(formik.errors.Mobile)}
                          helperText={formik.touched.Mobile && formik.errors.Mobile}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="WhatsApp"
                          name="WhatsApp"
                          label="WhatsApp"
                          value={formik.values.WhatsApp}
                          onChange={formik.handleChange}
                          error={formik.touched.WhatsApp && Boolean(formik.errors.WhatsApp)}
                          helperText={formik.touched.WhatsApp && formik.errors.WhatsApp}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="Telegram"
                          name="Telegram"
                          label="Telegram"
                          value={formik.values.Telegram}
                          onChange={formik.handleChange}
                          error={formik.touched.Telegram && Boolean(formik.errors.Telegram)}
                          helperText={formik.touched.Telegram && formik.errors.Telegram}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="Gmail"
                          name="Gmail"
                          label="Email"
                          value={formik.values.Gmail}
                          onChange={formik.handleChange}
                          error={formik.touched.Gmail && Boolean(formik.errors.Gmail)}
                          helperText={formik.touched.Gmail && formik.errors.Gmail}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="Address"
                          name="Address"
                          label="Address"
                          value={formik.values.Address}
                          onChange={formik.handleChange}
                          error={formik.touched.Address && Boolean(formik.errors.Address)}
                          helperText={formik.touched.Address && formik.errors.Address}
                          margin="normal"
                      />

                      <TextField
                          fullWidth
                          id="Birthday"
                          name="Birthday"
                          label="Birthday"
                          value={formik.values.Birthday}
                          onChange={formik.handleChange}
                          error={formik.touched.Birthday && Boolean(formik.errors.Birthday)}
                          helperText={formik.touched.Birthday && formik.errors.Birthday}
                          margin="normal"
                      />

                      {/* <TextField
                          fullWidth
                          id="UserName"
                          name="UserName"
                          label="UserName"
                          value={formik.values.UserName}
                          onChange={formik.handleChange}
                          error={formik.touched.UserName && Boolean(formik.errors.UserName)}
                          helperText={formik.touched.UserName && formik.errors.UserName}
                      />

                      <TextField
                          fullWidth
                          id="Password"
                          name="Password"
                          label="Password"
                          type={showPassword ? "text" : "password"} 
                          value={formik.values.Password}
                          onChange={formik.handleChange}
                          error={formik.touched.Password && Boolean(formik.errors.Password)}
                          helperText={formik.touched.Password && formik.errors.Password}
                          InputProps={{ // <-- This is where the toggle button is added.
                              endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                              </InputAdornment>
                              )
                          }}
                      /> */}

                      <TextField
                          fullWidth
                          id="Description"
                          name="Description"
                          label="Description"
                          value={formik.values.Description}
                          onChange={formik.handleChange}
                          error={formik.touched.Description && Boolean(formik.errors.Description)}
                          helperText={formik.touched.Description && formik.errors.Description}
                          margin="normal"
                      />

                      <Button color="primary" variant="contained" fullWidth type="submit"  margin="normal">
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