import { useState } from "react";
import { useFormik} from 'formik';
import {gymRegisterSchema} from '../../utils/yup.validation';
import { useNavigate } from 'react-router-dom';

// material
import {TextField,Button,InputAdornment,IconButton,Stack,Container,Typography} from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {editGym} from "../../api";
import {getFromStorage,setToStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

export default function GymForm () {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    
    let gymInfo = JSON.parse(getFromStorage('logininfo'));
    gymInfo.Str_Password = '';

    const formik = useFormik({
        initialValues: gymInfo, 
        validationSchema: gymRegisterSchema,
        onSubmit: (values) => {
            
            editGym(
                values.Prk_Gym_AutoID,
                values.Str_GymName,
                values.Str_OwnerTitle,
                values.Str_Address,
                values.Str_Tel,
                values.Str_Gmail,
                values.Str_Mobile,
                values.Str_UserName,
                values.Str_Password,
                values.Str_Description,
              ).then((result) => {
                console.log(result);              
                navigate("/gym/dashboard");
                setToStorage('logininfo', JSON.stringify(result.data.data));
              }).catch((error) => {
                console.log(error.response);
                errorNotifyByErrorObject(error);
              })

        },
    });


    return (
        <Page title="Gym Info | GymOnlineee">
          <Container>
            
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Update Gym
              </Typography>
            </Stack>

            <Scrollbar>
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <TextField
                            fullWidth
                            id="Str_GymName"
                            name="Str_GymName"
                            label="Gym Name"
                            value={formik.values.Str_GymName}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_GymName && Boolean(formik.errors.Str_GymName)}
                            helperText={formik.touched.Str_GymName && formik.errors.Str_GymName}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            id="Str_OwnerTitle"
                            name="Str_OwnerTitle"
                            label="Owner Title"
                            value={formik.values.Str_OwnerTitle}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_OwnerTitle && Boolean(formik.errors.Str_OwnerTitle)}
                            helperText={formik.touched.Str_OwnerTitle && formik.errors.Str_OwnerTitle}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            id="Str_Tel"
                            name="Str_Tel"
                            label="Tel"
                            value={formik.values.Str_Tel}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_Tel && Boolean(formik.errors.Str_Tel)}
                            helperText={formik.touched.Str_Tel && formik.errors.Str_Tel}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            id="Str_Mobile"
                            name="Str_Mobile"
                            label="Mobile"
                            value={formik.values.Str_Mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_Mobile && Boolean(formik.errors.Str_Mobile)}
                            helperText={formik.touched.Str_Mobile && formik.errors.Str_Mobile}
                            margin="normal"
                        />
                        
                        <TextField
                            fullWidth
                            id="Str_Gmail"
                            name="Str_Gmail"
                            label="Email"
                            value={formik.values.Str_Gmail}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_Gmail && Boolean(formik.errors.Str_Gmail)}
                            helperText={formik.touched.Str_Gmail && formik.errors.Str_Gmail}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            id="Str_Address"
                            name="Str_Address"
                            label="Address"
                            value={formik.values.Str_Address}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_Address && Boolean(formik.errors.Str_Address)}
                            helperText={formik.touched.Str_Address && formik.errors.Str_Address}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            id="Str_UserName"
                            name="Str_UserName"
                            label="User Name"
                            value={formik.values.Str_UserName}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_UserName && Boolean(formik.errors.Str_UserName)}
                            helperText={formik.touched.Str_UserName && formik.errors.Str_UserName}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            id="Str_Password"
                            name="Str_Password"
                            label="Password"
                            type={showPassword ? "text" : "password"} 
                            value={formik.values.Str_Password}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_Password && Boolean(formik.errors.Str_Password)}
                            helperText={formik.touched.Str_Password && formik.errors.Str_Password}
                            margin="normal"
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
                        />

                        <TextField
                            fullWidth
                            id="Str_Description"
                            name="Str_Description"
                            label="Description"
                            value={formik.values.Str_Description}
                            onChange={formik.handleChange}
                            error={formik.touched.Str_Description && Boolean(formik.errors.Str_Description)}
                            helperText={formik.touched.Str_Description && formik.errors.Str_Description}
                            margin="normal"
                        />

                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Edit Gym
                        </Button>
                    </form>
                </div>
              </Scrollbar>
          </Container>
        </Page>
      );



}