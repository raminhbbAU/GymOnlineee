import { useState,useEffect } from "react";
import { useFormik} from 'formik';
import {trainerRegisterSchema} from '../../utils/yup.validation';
import { useNavigate,useParams } from 'react-router-dom';

// material
import {TextField,Button,InputAdornment,IconButton,Stack,Container,Typography} from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';

// utils / API
import {registerNewTrainer,editTrainer,getTrainerInfoByTrainerID} from "../../api";
import {getFromStorage} from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";

export default function TrainerForm () {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const handleClickShowPassword = () => setShowPassword(!showPassword);
    // const handleMouseDownPassword = () => setShowPassword(!showPassword);

    let { trainerID } = useParams();
    let {loginType, loginId} = JSON.parse(getFromStorage('logininfo'));
    const avatar ='';


    useEffect( () => {


      if (trainerID || loginType === 'trainer')
      {        
          setEditMode(true);

          getTrainerInfoByTrainerID(
            loginType === 'trainer' ? loginId : trainerID
            ).then((result) => {

              console.log(result.data.data)
              setFullName(result.data.data.Str_TrainerName + ' ' + result.data.data.Str_TrainerFamily)
              formik.setFieldValue('TrainerName',result.data.data.Str_TrainerName);
              formik.setFieldValue('TrainerFamily',result.data.data.Str_TrainerFamily);
              formik.setFieldValue('Mobile',result.data.data.Str_Mobile);
              formik.setFieldValue('WhatsApp',result.data.data.Str_WhatsApp);
              formik.setFieldValue('Gmail',result.data.data.Str_Gmail);

              setIsLoading(true);           

            }).catch((error) => {
              console.log(error.response);
              errorNotifyByErrorObject(error);
            })
      }
      else
      {
          setIsLoading(true);
      }
    },[])

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
          handleSubmit(values);
      }
    });

    const handleSubmit = (values) => {

      if (editMode)
      {
        editTrainer(     
          loginType === 'trainer' ? loginId : trainerID,
          values.TrainerName,
          values.TrainerFamily,
          values.Mobile,
          values.WhatsApp,
          values.Gmail,
          avatar,
        ).then((result) => {
          navigate(loginType === 'trainer' ? "/trainer/dashboard" : "/gym/trainer");
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
      }
      else
      {
        registerNewTrainer(
          loginId,
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
          errorNotifyByErrorObject(error);
        })
      }

    }

    return (
        <Page title="New Trainer | GymOnlineee">

        {isLoading && (
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
        )}

        </Page>
      );



}