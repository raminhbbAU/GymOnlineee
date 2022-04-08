import React,{useEffect,useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from "../../components/copyright.js"
import {registerNewGym,registerNewStudent,registerNewTrainer} from "../../api";
import {setToStorage}  from "../../storage/localstorage.js";
import {sucessNotify,errorNotifyByErrorObject} from "../../utils/toast.notification";
import {gymID} from "../../constants/api.config";

const theme = createTheme();


export default function SignUp() {

  
  const navigate = useNavigate();
  const location = useLocation()
  const [loading,setLoading] = useState(false)
  const [userType,setUserType] = useState('Gym')
  const [enableGymSignUp,setEnableGymSignUp] = useState(false)

  useEffect(()=>{

    if (location.pathname.toLowerCase().endsWith("/gymsignup")) {
      setEnableGymSignUp(true);
      setUserType('Gym')
    }
    else{
      setEnableGymSignUp(false);
      setUserType('Athlete')
    }
    setLoading(true);

  },[])


  const userTypeChange = (e) => {
    e.preventDefault();
    setUserType(e.target.value)
  }

  const FormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    switch (userType) {
      case 'Gym':
        registerNewGym(
          data.get('name'),
          data.get('mobile'),
          data.get('gmail'),
          data.get('password')
          ).then((result) => {
            if (result) {
              console.log(result);
              if (result.data.res) {
                // setToStorage('isAuth',result.data.auth);
                // setToStorage('JWT_Token',result.data.token);
                // setToStorage('logininfo', JSON.stringify(result.data.data));
                navigate("/ConfirmationSendMessage");
              }
              else{
                errorNotifyByErrorObject("error");
              }
            }
          }).catch((error) => {
            console.log(error.response);
            errorNotifyByErrorObject(error);
          })
        break;
      case 'Trainer':
        registerNewTrainer(
          gymID,
          data.get('name'),
          data.get('family'),
          data.get('mobile'),
          data.get('mobile'),
          data.get('gmail'),
          data.get('gmail'), //values.UserName
          data.get('password'), //values.Password,
          '', //avatar
        ).then((result) => {
          console.log(result);
          navigate("/ConfirmationSendMessage");
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
          break;
      case 'Athlete':
        registerNewStudent(
          gymID,
          data.get('name'),
          data.get('family'),
          data.get('mobile'),
          data.get('mobile'),
          data.get('mobile'),
          data.get('gmail'),
          '', // address
          '1900/01/01',
          data.get('gmail'), //default username
          data.get('password'), //default passowrd
          '', //Description
        ).then((result) => {
          console.log(result);              
          navigate("/ConfirmationSendMessage");
        }).catch((error) => {
          console.log(error.response);
          errorNotifyByErrorObject(error);
        })
        break;    
      default:
        break;
    }
    
  };




  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />

        { loading && (
          <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

        <RadioGroup
          id='signupRadioGroup'
          row
          aria-label="userType"
          value= {userType}
          defaultValue= {enableGymSignUp ? "Gym" :"Athlete"  }
          name="userType"
          onChange={(e) => userTypeChange(e)}
          >
          <FormControlLabel 
            disabled = {!enableGymSignUp}
            value="Gym" 
            control={<Radio />} 
            label="Gym" 
          />
          <FormControlLabel
            disabled = {enableGymSignUp}
            value="Trainer"
            control={<Radio />}
            label="Trainer"
          />
          <FormControlLabel
            disabled = {enableGymSignUp}
            value="Athlete"
            control={<Radio />}
            label="Athlete"
          />
        </RadioGroup>

          <Box component="form" noValidate onSubmit={FormSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>

            {(userType == 'Athlete' || userType == 'Trainer') && (
              <Grid item xs={12} >
                <TextField
                  autoComplete="family"
                  name="family"
                  required
                  fullWidth
                  id="family"
                  label="Family"
                  autoFocus
                />
              </Grid>
            )}

            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gmail"
                label="Gmail Address / User Name"
                name="gmail"
                autoComplete="gmail"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          </Box>

        </Box>
        )}

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}