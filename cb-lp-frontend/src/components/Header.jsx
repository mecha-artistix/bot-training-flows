import * as React from 'react';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  List,
  ListItem,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ToggleColorMode from './ToggleColorMode';
import { ColorModeContext } from '../context/theme/ColorModeContext';
import { adjustOpacity } from '../utils/adjustOpacity';
import { motion, useInView } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';
import SiteLogo from './SiteLogo';

function Header() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = isInView ? 'animate' : 'initial';
  const { mode } = React.useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Product', link: '#product' },
    { name: 'Pricing', link: '#pricing' },
    { name: 'Resources', link: '#resources' },
  ];

  const styles = {
    appBar: {
      // color: theme.palette.text,
      py: '10px',
      boxShadow: 0,
      bgcolor: 'transparent',
      backgroundImage: 'none',
    },
    toolbar: {
      // color: 'black',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1rem',
      flexShrink: 0,
      borderRadius: '999px',
      bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(24px)',
      maxHeight: 40,
      border: '1px solid',
      borderColor: 'divider',

      boxShadow: theme.customShadows.glowingShadow[theme.palette.mode],
    },
    child: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },

    nav: { display: { xs: 'block', md: 'none' } },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      gap: '1rem',
    },
    button: {
      width: '100px',
    },
    menuMob: {
      position: 'absolute',
    },
  };

  return (
    <AppBar
      ref={ref}
      sx={styles.appBar}
      position="sticky"
      component={motion.header}
      variants={animationVariants.slideInDown}
      initial="initial"
      animate={animate}
    >
      <Toolbar sx={styles.toolbar}>
        <Box sx={{ ...styles.child }}>
          <SiteLogo />
        </Box>
        {isDesktop ? (
          <>
            <Box sx={{ ...styles.child }}>
              <List sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, gap: 2, justifyContent: 'space-around' }}>
                {navLinks.map((link, i) => (
                  <ListItem key={i}>{link.name}</ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ ...styles.child, ...styles.buttonGroup }}>
              <ToggleColorMode />
              <Button
                href={import.meta.env.VITE_APP_URL + 'sign-in/'}
                variant="outlined"
                sx={styles.button}
                color="accent"
              >
                Login
              </Button>
              <Button
                href={import.meta.env.VITE_APP_URL + 'sign-in/register/'}
                variant="contained"
                sx={styles.button}
                color="accent"
              >
                Sign Up
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Button onClick={handleMenuClick}>
              <MenuIcon />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              disableScrollLock={true}
              PaperProps={{
                sx: {
                  variant: 'customMenu',
                },
              }}
            >
              {navLinks.map((link, i) => (
                <MenuItem key={i}>{link.name}</MenuItem>
              ))}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Button variant="outlined" sx={styles.button} color="accent">
                  Login
                </Button>
                <Button variant="contained" sx={styles.button} color="accent">
                  Sign Up
                </Button>
              </Box>
            </Menu>
            <ToggleColorMode />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
