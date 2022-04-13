import { useNavigate } from 'react-router-dom';


import { Icon } from '@iconify/react';
import { useRef, useState, useEffect } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';

// components
import MenuPopover from '../../components/MenuPopover';

// utils / API
import {getFromStorage,removeFromStorage} from "../../storage/localstorage.js";


const avator = '/assets/avatar/avatar_default.jpg';

// ----------------------------------------------------------------------

export default function AccountPopover() {


  

  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  let [homePath,setHomePath] = useState('/gym/dashboard');
  let [profilePath,setProfilePath] = useState('/gym/profile');
  let [settingPath,setSettingPath] = useState('#');
  let {loginType, loginId, loginName, loginUserName} = JSON.parse(getFromStorage('logininfo'));


  let MENU_OPTIONS = [
    {
      label: 'Home',
      icon: homeFill,
      linkTo: homePath
    },
    {
      label: 'Profile',
      icon: personFill,
      linkTo: profilePath
    },
    {
      label: 'Settings',
      icon: settings2Fill,
      linkTo: settingPath
    }
  ];
  

  useEffect(()=>{

    switch (loginType) {
      case 'gym':
        setHomePath('/gym/Dashboard')
        setProfilePath('/gym/profile')
        break;
      case 'student':
        setHomePath('/student/Dashboard')
        setProfilePath('/student/profile')
        break;
      case 'trainer':
        setHomePath('/trainer/Dashboard')
        setProfilePath('/trainer/profile')
        break;
      default:
        setHomePath('/gym/Dashboard')
        setProfilePath('/gym/Dashboard')
        break;
    }

},[])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {

    //Save Logout on DB

    //Refresh cache
    removeFromStorage('isAuth');
    removeFromStorage('JWT_Token');
    removeFromStorage('logininfo');

    //Go to login page
    navigate("/login");
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={avator} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {loginName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loginUserName}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogOut}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
