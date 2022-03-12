import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

import { MotionContainer, varBounceIn } from '../../components/animate';
import Page from '../../components/Page';

import {gymActivateAccount} from "../../api";

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

export default function EmailConfirmation () {

    const [loading,isLoading] = useState(false);
    const [error,setError] = useState('');
    const [success,setsuccess] = useState(false);

  
    useEffect( ()=> {

      const queryParams = new URLSearchParams(window.location.search)
      const type = queryParams.get("type")
      const uuid = queryParams.get("uuid")

      if (!type || !uuid)
      {
          isLoading(true);
          setError('The confirmation link is not valid!')
      }
      else
      {

        switch (type) {
          case 'gym':
            
            gymActivateAccount(uuid)
            .then((res) => {
              if (res) {
                isLoading(true);
                setsuccess(true);
              }
            }).catch((error)=>{
                isLoading(true);
                setError(error.response.data.data);
            })

            break;
          case 'student':
            
              break;
          case 'trainer':
            
                break;
              
          default:
            isLoading(true);
            setError('The confirmation link is not valid!')
            break;
        }

      }

    },[])

    return (
        <RootStyle title="Email Confirmation | GymOnlineee">

         {loading && (
            <Container>
            <MotionContainer initial="initial" open>
              <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                 
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                        {success ? 'Thank you! your account successfully confirmed.' : 'Something is wrong!'}               
                    </Typography>
                  </motion.div>

                  <Typography sx={{ color: 'text.secondary' }}>
                    {success ? 'Please click on the login button' : error}
                  </Typography>

                  <motion.div variants={varBounceIn}>
                    <Box
                        component="img"
                        src="/assets/illustrations/illustration_register.png"
                        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />
                  </motion.div>

                  <Button to="/login" size="large" variant="contained" component={RouterLink}>
                    Login
                  </Button>
              </Box>
            </MotionContainer>
            </Container>
         )}

      </RootStyle>
    )

}