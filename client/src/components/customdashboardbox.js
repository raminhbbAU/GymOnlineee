import { Icon } from '@iconify/react';
//import androidFilled from '@iconify/icons-ant-design/android-filled';
import editFill from '@iconify/icons-eva/edit-fill';

// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme,customcolor }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: customcolor.darker,
  backgroundColor: customcolor.lighter,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));


// ----------------------------------------------------------------------

export default function CustomDashboardBox(props) {
  return (
    <RootStyle customcolor={props.color}>
      {props.children}
    </RootStyle>
  );
}
