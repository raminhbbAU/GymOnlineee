import { Icon } from '@iconify/react';
//import androidFilled from '@iconify/icons-ant-design/android-filled';
import editFill from '@iconify/icons-eva/edit-fill';

// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme,customColor }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: customColor=='' ? theme.palette.warning.darker : theme.palette.primary.darker,
  backgroundColor: customColor=='' ? theme.palette.warning.lighter : theme.palette.primary.lighter,
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

export default function CustomDashboardBox({title,value,color}) {
  return (
    <RootStyle customColor={''}>
      <IconWrapperStyle>
        <Icon icon={editFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{value}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}
