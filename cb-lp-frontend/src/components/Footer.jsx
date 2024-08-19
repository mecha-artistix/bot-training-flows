import * as React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Grid, Link, List, ListItem, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { motion, useInView } from 'framer-motion';
import SiteLogo from './SiteLogo';
import { animationVariants } from '../context/theme/animationVariants';

function Footer() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = isInView ? 'animate' : 'initial';
  const theme = useTheme();

  const style = {
    footerSection: {
      margin: '0px auto',
      padding: '30px 10px 0px 10px',
      bgcolor: theme.palette.grey[900],
      color: 'white',
    },
    footerGrid: {
      maxWidth: '1200px',
      margin: '0 auto',
      '& .row': {
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
    socialIcons: {
      justifyContent: { md: 'center', lg: 'flex-end' },
      gap: 2,
      '& .icon-cont': {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '50px',
        borderRadius: '9999%',
        padding: 1,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.accent.dark,
        '&:hover': {
          bgcolor: theme.palette.accent.light,
        },
      },
    },
  };
  const socials = [
    { name: 'Facebook', icon: <FacebookIcon /> },
    { name: 'Twitter', icon: <TwitterIcon /> },
    { name: 'Instagram', icon: <InstagramIcon /> },
  ];
  return (
    <Box component={motion.footer} sx={style.footerSection}>
      <Grid
        ref={ref}
        className="row"
        container
        component={motion.div}
        sx={style.footerGrid}
        variants={animationVariants.fadeIn.parent()}
        initial="initial"
        animate={animate}
        gap={3}
      >
        <Grid item xs={12} sm={5} md={5} lg={5}>
          <SiteLogo />
        </Grid>
        <Grid item xs={12} sm={5} md={5} lg={5}>
          <Stack direction="horizontal" className="social-icons" component={motion.div} sx={style.socialIcons}>
            {socials.map((social, i) => (
              <IconButton
                key={i}
                className="icon-cont"
                size="large"
                component={motion.button}
                variants={animationVariants.bounceInUp.child(i)}
                initial="initial"
                animate={animate}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={5} md={5} lg={5}>
          <FooterLinks />
        </Grid>
        <Grid item xs={12} sm={5} md={5} lg={5}>
          <FooterContacts />
        </Grid>
        <Grid item xs={12} sm={5} md={5} lg={5}>
          <Copyright />
        </Grid>
      </Grid>
    </Box>
  );
}

function FooterLinks() {
  const links = [
    { name: 'Privacy Policy', url: '/privacy-policy' },
    { name: 'Cookie Policy', url: '/cookie-policy' },
    { name: 'Terms of Service', url: '/terms-of-service' },
    { name: 'Contact Us', url: '/contact' },
    { name: 'About Us', url: '/about' },
    { name: 'Careers', url: '/careers' },
    { name: 'Help Center', url: '/help-center' },
  ];
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = isInView ? 'animate' : 'initial';
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 2,
  };
  return (
    <List
      ref={ref}
      component={motion.ul}
      sx={style}
      variants={animationVariants.bounceInUp.parent()}
      initial="initial"
      animate={animate}
    >
      {links.map((link, i) => (
        <ListItem key={i} component={motion.li} variants={animationVariants.bounceInUp.child(i)}>
          <Link href={link.url} color="inherit" underline="none">
            {link.name}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

function FooterContacts() {
  const contacts = [
    { name: 'address', body: '1234 Maple Street, Suite 567 Springfield, CA 98765 United States' },
    { name: 'phone', body: '(123) 456-7890' },
    { name: 'email', body: 'info@creativebot.com' },
  ];
  const style = {
    width: 'clamp(300px, 50%, 600px)',
    textAlign: 'right',
    '& .contact-item': {
      display: 'block',
    },
  };
  return (
    <Typography variant="small" sx={style}>
      {contacts.map((el, i) => (
        <span key={i} className="contact-item">
          <strong>{el.name} :</strong>
          {el.body}
        </span>
      ))}
    </Typography>
  );
}

function Copyright() {
  return <Typography variant="small">&copy; {import.meta.env.VITE_SITE_NAME}. All Rights Reserved.</Typography>;
}

export default Footer;
