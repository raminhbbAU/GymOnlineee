import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

import { MotionContainer, varBounceIn } from '../../components/animate';
import Page from '../../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

export default function ConfirmationSendMessage () {

    return (
        <RootStyle title="Enroll Confirmation | GymOnlineee">
        <Container>
          <MotionContainer initial="initial" open>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                    Thank you! A Confirmation Email has been sent to you.
                </Typography>
                </motion.div>
                <Typography sx={{ color: 'text.secondary' }}>
                Please Check your e-mail inbox and click on the mentioned link to activate your account. if you can't find the e-mail, please check your spam/junk section.
                </Typography>

                <motion.div variants={varBounceIn}>
                <Box
                    component="img"
                    src="/assets/illustrations/illustration_register.png"
                    sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                />
                </motion.div>

                <Button to="/login" size="large" variant="contained" component={RouterLink}>
                Go to Home
                </Button>
            </Box>
          </MotionContainer>
        </Container>
      </RootStyle>
    )

}