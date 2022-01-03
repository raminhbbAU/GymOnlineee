import { Icon } from '@iconify/react';
//import androidFilled from '@iconify/icons-ant-design/android-filled';
import editFill from '@iconify/icons-eva/edit-fill';
import alerttrianglefill from '@iconify/icons-eva/alert-triangle-fill';

// material
import { alpha, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


// ----------------------------------------------------------------------

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

export default function CustomDashboardCard({title,value,isLoading,isError,onClick}) {


  if (isError)
  {
        return (
            <>
            <IconWrapperStyle>
                <Icon icon={alerttrianglefill} width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h6"> {"unable to fetch"}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
            </>
        )
  }

  if (isLoading)
  {
      return (
          <>
            <CircularProgress />
          </>
      )
  }

  return (
    <>
      <IconWrapperStyle>
        <Icon icon={editFill} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{value}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </>
  );
}
