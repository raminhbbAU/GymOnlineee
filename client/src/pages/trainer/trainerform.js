import { useState } from "react";
import { useFormik} from 'formik';
import {trainerRegisterSchema} from '../../utils/yup.validation';
import { useNavigate } from 'react-router-dom';

// material
import {TextField,Button,InputAdornment,IconButton,Stack,Container,Typography} from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {apiTrainer} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";

export default function TrainerForm () {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

   
    let {Prk_Gym_AutoID} = JSON.parse(getFromStorage('logininfo'));
    const avatar ='';

    const formik = useFormik({
        initialValues: {
            TrainerName:'' ,
            TrainerFamily:'',
            Mobile:'',
            WhatsApp:'',
            Gmail:'',
        }, 
        validationSchema: trainerRegisterSchema,
        onSubmit: (values) => {

            console.log(values);

            apiTrainer.registerNewTrainer(
                Prk_Gym_AutoID,
                values.TrainerName,
                values.TrainerFamily,
                values.Mobile,
                values.WhatsApp,
                values.Gmail,
                values.Gmail, //values.UserName
                values.Mobile, //values.Password,
                avatar,
              ).then((result) => {
                console.log(result);
                navigate("/gym/trainer");
              }).catch((error) => {
                console.log(error.response);
              })

        },
    });


    return (
        <Page title="New Trainer | GymOnlineee">
          <Container>
            
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Add New Trainer
              </Typography>
            </Stack>

            <Scrollbar>
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <TextField
                            fullWidth
                            id="TrainerName"
                            name="TrainerName"
                            label="TrainerName"
                            value={formik.values.TrainerName}
                            onChange={formik.handleChange}
                            error={formik.touched.TrainerName && Boolean(formik.errors.TrainerName)}
                            helperText={formik.touched.TrainerName && formik.errors.TrainerName}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            id="TrainerFamily"
                            name="TrainerFamily"
                            label="TrainerFamily"
                            value={formik.values.TrainerFamily}
                            onChange={formik.handleChange}
                            error={formik.touched.TrainerFamily && Boolean(formik.errors.TrainerFamily)}
                            helperText={formik.touched.TrainerFamily && formik.errors.TrainerFamily}
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
                            id="Gmail"
                            name="Gmail"
                            label="Email"
                            value={formik.values.Gmail}
                            onChange={formik.handleChange}
                            error={formik.touched.Gmail && Boolean(formik.errors.Gmail)}
                            helperText={formik.touched.Gmail && formik.errors.Gmail}
                            margin="normal"
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