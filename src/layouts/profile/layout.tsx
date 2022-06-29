import React, { useEffect, useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SummarizeIcon from '@mui/icons-material/SummarizeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import { Typography, Grid, Container, Box } from '@mui/material';
import useResponsive from '@/utils/responsive';
import { useAuth } from '@/modules/auth';
import { useLoadNotificationCount } from '@/services/notification.service';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CoreLayout from '@/layouts/core/coreLayout';

const styles = {
  menu: {
    py: 1.5,
    fontWeight: 500,
    color: '#444',
    fontSize: '1.1rem',
    '& svg': {
      mr: 1,
      mt: '-0.2em',
      color: '#757575',
      verticalAlign: 'middle',
    },
  },
  selectedMenu: {
    background: '#edf2f4',
    fontWeight: 700,
  },
  badge: {
    display: 'inline-block',
    p: 0,
    height: 24,
    lineHeight: '28px',
    mt: '-4px',
    px: 1,
    background: '#EF5350',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 3,
  },
};

function Profile({ children }) {
  const { data: session } = useSession({
    required: true,
  });

  const { data: countData } = useLoadNotificationCount();
  const { push: navigate, pathname } = useRouter();
  const { md } = useResponsive();
  // const { isLogin } = useAuth();

  const notificationCount = countData?.count || 0;

  const menu = useMemo(() => {
    return [
      {
        title: 'اطلاعات من',
        icon: <PersonIcon />,
        path: 'information',
      },
      {
        title: 'رزومه من',
        icon: <SummarizeIcon />,
        path: 'resume',
      },
      {
        title: 'اطلاعیه ها',
        icon: <NotificationsIcon />,
        path: 'notifications',
        badge: notificationCount,
      },
    ];
  }, [notificationCount]);

  // useEffect(() => {
  //   // if (!isLogin) {
  //   //   navigate('/');
  //   // }
  // }, [isLogin, navigate]);

  return (
    <CoreLayout>
      <Container maxWidth="xl" sx={{ background: '#fff', border: '1px solid #eee' }} disableGutters>
        <Grid container spacing={2} xs>
          {md && (
            <Grid item xs={2}>
              <Box style={{ height: '100vh', borderLeft: '2px solid #e0e0e0', overflow: 'auto' }}>
                <MenuList sx={{ mt: 3 }}>
                  {menu.map((m, index) => (
                    <MenuItem
                      key={index}
                      sx={{ ...styles.menu, ...(pathname.indexOf(m.path) > -1 ? styles.selectedMenu : {}) }}
                      onClick={() => navigate(m.path)}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        {m.icon}
                        {m.title}
                      </Box>
                      {!!m.badge && <Box sx={styles.badge}>{m.badge}</Box>}
                    </MenuItem>
                  ))}
                </MenuList>
              </Box>
            </Grid>
          )}
          <Grid item md={10} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </CoreLayout>
  );
}

export default Profile;
