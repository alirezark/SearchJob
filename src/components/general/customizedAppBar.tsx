import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Divider, Badge } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import BuildingIcon from '@exam/uikit/icons/building';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import useResponsive from '@/utils/responsive';
import { useAuth } from '@/modules/auth';
import { signOut } from 'next-auth/react';

//Icons
import HomeIcon from '@mui/icons-material/Home';
import NewsIcon from '@mui/icons-material/Feed';
import BlogIcon from '@mui/icons-material/RssFeed';
import FaqIcon from '@mui/icons-material/Help';
import ProfileIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import ResumeIcon from '@mui/icons-material/InsertDriveFileOutlined';
import NotificationIcon from '@mui/icons-material/CampaignOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Services
// import { useLoadNotificationCount } from '@/services/notification.service';
import { useSession } from 'next-auth/react';

const styles = {
  root: {
    background: '#fff',
    py: 1,
    position: 'relative',
    boxShadow: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
      xs: 'none',
    },
    borderBottom: {
      sm: 'none',
      xs: '1px solid #ddd',
    },
    '& .MuiButton-root': {
      color: 'primary.main',
      fontWeight: 500,
    },
  },
  badge: {
    p: 0,
    height: 20,
    mt: '-2px',
    px: 1,
    background: '#EF5350',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 3,
  },
};

const MainMenu = [
  {
    title: 'جستجوی شغل',
    icon: <HomeIcon />,
    href: '/',
  },
  {
    title: 'اخبار',
    icon: <NewsIcon />,
    href: '/news',
  },
  {
    title: 'بلاگ',
    icon: <BlogIcon />,
    href: '/blog',
  },
  {
    title: 'سوالات متداول',
    icon: <FaqIcon />,
    href: '/faq',
  },
  'divider',
];

const SearchLinks = [
  {
    title: 'نرم‌افزار',
    to: '/search/نرم‌افزار',
  },
  {
    title: 'IT',
    to: '/search/IT',
  },
  {
    title: 'طراحی',
    to: '/search/طراحی',
  },
  {
    title: 'تولید محتوا',
    to: '/search/تولید محتوا',
  },
  {
    title: 'ceo',
    to: '/search/مدیر عامل',
  },
  {
    title: 'مالی حسابداری',
    to: '/search/مالی حسابداری',
  },
  {
    title: 'برق و الکترونیک',
    to: '/search/برق و الکترونیک',
  },
  {
    title: 'سایر دسته‌ها',
    to: '/jobs',
  },
];

const GuestMenu = [
  {
    title: 'ورود',
    icon: <LoginIcon />,
    href: 'https://account.web.site/auth',
  },
];

const HomeMenu = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: 'none',
          sm: 'flex',
        },
      }}
    >
      {SearchLinks.map((item, index) => (
        <Link href={item.to} key={index} passHref>
          <Button>{item.title}</Button>
        </Link>
      ))}
    </Box>
  );
};

function CustomizedAppBar() {
  // const { data: countData } = useLoadNotificationCount();
  const { data: session, status } = useSession();
  const isLogin = status === 'authenticated';
  // const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  // const { pathname } = useLocation();
  const { sm } = useResponsive();
  const { push: navigate, pathname } = useRouter();

  const notificationCount = 0 ; // countData?.count ||

  const isHome = pathname === '/';

  useEffect(() => {
    setOpenDrawer(false);
  }, [pathname]);

  const UserMenu = [
    {
      title: 'اطلاعات من',
      icon: <ProfileIcon />,
      to: '/profile/information',
    },
    {
      title: 'رزومه من',
      icon: <ResumeIcon />,
      to: '/profile/resume',
    },
    {
      title: 'اطلاعیه‌ها',
      icon: <NotificationIcon />,
      to: '/profile/notifications',
    },
    'divider',
    {
      title: 'خروج',
      icon: <LoginIcon />,
      onClick: () => {
        logOut();
        window.location.href = '/home';
      },
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'flex',
                sm: 'none',
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer anchor="left" open={openDrawer} onOpen={() => null} onClose={() => setOpenDrawer(false)}>
              <Box
                sx={{
                  width: 250,
                  '& svg': { mt: '-0.1rem' },
                }}
              >
                <List>
                  {[...MainMenu, ...(isLogin ? UserMenu : GuestMenu)].map((menu: any, index) =>
                    menu === 'divider' ? (
                      <Divider />
                    ) : !!menu.onClick ? (
                      <ListItem key={index} button {...menu}>
                        <div>
                          <ListItemIcon sx={{ minWidth: 42 }}>{menu.icon}</ListItemIcon>
                          <ListItemText primary={menu.title} sx={{ fontWeight: 500 }} disableTypography />
                        </div>
                      </ListItem>
                    ) : (
                      <Link href={menu.href}>
                        <ListItem key={index} button {...menu}>
                          <>
                            <ListItemIcon sx={{ minWidth: 42 }}>{menu.icon}</ListItemIcon>
                            <ListItemText
                              primary={menu.title}
                              sx={{ fontWeight: 500, fontFamily: 'YekanBakh' }}
                              disableTypography
                            />
                          </>
                        </ListItem>
                      </Link>
                    )
                  )}
                </List>
              </Box>
            </SwipeableDrawer>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/');
                }}
              >
                <Typography textAlign="center">خانه</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/news');
                }}
              >
                <Typography textAlign="center">اخبار</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/blog');
                }}
              >
                <Typography textAlign="center">بلاگ</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/faq');
                }}
              >
                <Typography textAlign="center">سوالات متداول</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/jobs');
                }}
              >
                <Typography textAlign="center">لیست مشاغل</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {sm && !isHome && (
            <Link href="/">
              <img src="/static/images/logo-mini.svg" alt="Logo" />
            </Link>
          )}

          {isHome ? (
            <HomeMenu />
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
              }}
            >
              <Link href="/" passHref>
                <Button>جستجوی شغل</Button>
              </Link>
              <Link href="https://blog.web.site/group/news/" passHref>
                <Button>اخبار</Button>
              </Link>
              <Link href="https://blog.web.site" passHref>
                <Button>بلاگ</Button>
              </Link>
              <Link href="/faq" passHref>
                <Button>سوالات متداول</Button>
              </Link>
              <Link href="/jobs" passHref>
                <Button>لیست مشاغل</Button>
              </Link>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {isLogin ? (
              <>
                <Tooltip title="داشبورد">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Badge badgeContent={notificationCount} color="error" overlap="circular">
                      <Avatar
                        src="/static/images/avatar-man.svg"
                        sx={{
                          background: '#E8F3FF',
                          width: {
                            sm: 50,
                            xs: 36,
                          },
                          height: {
                            sm: 50,
                            xs: 36,
                          },
                          '& img': {
                            width: '50%',
                            height: 'auto',
                          },
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    sx={{ minWidth: 130 }}
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate('/profile/information');
                    }}
                  >
                    اطلاعات من
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate('/profile/resume');
                    }}
                  >
                    رزومه من
                  </MenuItem>
                  <MenuItem
                    sx={{ justifyContent: 'space-between' }}
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate('/profile/notifications');
                    }}
                  >
                    اطلاعیه ها
                    {notificationCount > 0 && <Box sx={styles.badge}>{notificationCount}</Box>}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logOut();
                      handleCloseUserMenu();
                    }}
                  >
                    خروج
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link href="https://account.web.site/auth">
                  <Button variant="outlined" color="primary" sx={{ borderRadius: '8px' }} size="small" href="https://account.web.site/auth">
                    ورود
                    <Divider flexItem orientation="vertical" sx={{ borderColor: 'primary.main', mx: 1, my: '4px' }} />
                    ثبت نام
                  </Button>
                </Link>
                {/*<Button onClick={() => navigate('https://account.web.site/employer/auth')} startIcon={<BuildingIcon />}>*/}
                {/*  ورود کارفرمایان*/}
                {/*</Button>*/}
                {/*<Button onClick={() => navigate('/login')} startIcon={<PersonRoundedIcon />}>*/}
                {/*  ورود کارجویان*/}
                {/*</Button>*/}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default CustomizedAppBar;
