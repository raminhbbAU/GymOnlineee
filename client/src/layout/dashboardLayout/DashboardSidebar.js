import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { withTranslation } from "react-i18next";

// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';

//
import {gymSidebarItems,studentSidebarItems,trainerSidebarItems} from './SidebarConfig';


// utils / API
import {getFromStorage,removeFromStorage} from "../../storage/localstorage.js";

// ----------------------------------------------------------------------

const avator = '/assets/avatar/avatar_default.jpg';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

function DashboardSidebar({ t,isOpenSidebar, onCloseSidebar }) {
//export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  
  const { pathname } = useLocation();
  let logininfo = JSON.parse(getFromStorage('logininfo'));
  let [sidebarConfig,setSidebarConfig] = useState(gymSidebarItems(t));

  useEffect(() => {

    if (isOpenSidebar) {
      onCloseSidebar();
    }

    if (logininfo)
    {
      switch (logininfo.loginType) {
        case 'gym':
          setSidebarConfig(gymSidebarItems(t));
          break;
        case 'student':
          setSidebarConfig(studentSidebarItems(t));
          break;
        case 'trainer':
          setSidebarConfig(trainerSidebarItems(t));
          break;
        default:
          setSidebarConfig(gymSidebarItems(t));
          break;
      }
    }
    else
    {
      setSidebarConfig(gymSidebarItems);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={avator} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {logininfo.loginName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {logininfo.loginUserName}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >

        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

export default withTranslation()(DashboardSidebar);