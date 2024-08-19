import * as React from 'react';
import { Grid, Stack, Box, Typography, Divider } from '@mui/material';

import drivetechLight from '../assets/img/logos/clients/Drivetech-light.png';
import marsbpoLight from '../assets/img/logos/clients/marsbpo-light.png';
import sykesLight from '../assets/img/logos/clients/SYKES-light.png';
import amigosbpoLight from '../assets/img/logos/clients/amigos_bpo-light.png';

import drivetechDark from '../assets/img/logos/clients/Drivetech-dark.png';
import marsbpoDark from '../assets/img/logos/clients/marsbpo-dark.png';
import sykesDark from '../assets/img/logos/clients/SYKES-light.png';
import amigosbpoDark from '../assets/img/logos/clients/amigos_bpo-dark.png';

import { ColorModeContext } from '../context/theme/ColorModeContext';
import { useTheme } from '@emotion/react';
import { motion, useInView } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';
function InfoIntegrations() {
  const { mode } = React.useContext(ColorModeContext);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, marginTop: '99px' });
  const animate = isInView ? 'animate' : 'initial';
  const theme = useTheme();
  const brandsImg = [
    { light: drivetechLight, dark: drivetechDark },
    { light: marsbpoLight, dark: marsbpoDark },
    { light: sykesLight, dark: sykesDark }, //
    { light: amigosbpoLight, dark: amigosbpoDark },
  ];
  // const brandsImg = Array(6).fill(0);
  const style = {
    stack: {
      minHeight: {
        xs: 'auto',
        sm: 'auto',
        md: '200px',
        lg: '300px',
      },
      gap: '20px',
      justifyContent: 'space-around',
      alignItems: 'center',
      p: 2,
    },
    gridContainer: {
      padding: 5,
      flexWrap: { md: 'nowrap' },
      justifyContent: { sm: 'center', md: 'space-between' },
      alignItems: 'center',
      // gap: 2,
    },
    gridItem: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      p: 2,
      img: {
        width: '100%',
        // aspectRatio: '2.5/2',
        // margin: '0 32px',
        // filter: mode == 'dark' ? 'brightness(100000) invert(0.1)' : 'grayscale(100%)',
        // '&:hover': {
        //   filter: 'none',
        // },
      },
    },
  };
  return (
    <Stack
      ref={ref}
      direction="column"
      component={motion.div}
      variants={animationVariants.fadeInUp.parent()}
      initial="initial"
      animate={animate}
      sx={style.stack}
      className="bg-glass"
    >
      <Typography variant="h5" component={motion.h5} variants={animationVariants.slideInUp.child()}>
        Integrate your personal bot in all your services
      </Typography>
      <Grid container sx={style.gridContainer}>
        {brandsImg.map((el, i) => (
          <>
            <Grid item key={i} xs={12} sm={3} md={3} lg={2}>
              <Box sx={style.gridItem} component={motion.div} variants={animationVariants.bounceInUp.child(i + 2)}>
                {/* <img src={asterisk} alt={asterisk} loading="lazy" /> */}
                <img src={mode === 'light' ? el.light : el.dark} alt={el.light} loading="lazy" />
              </Box>
            </Grid>
            {i < brandsImg.length - 1 && (
              <Divider
                sx={{
                  orientation: { xs: 'horizontal', md: 'vertical' },
                  borderWidth: { xs: '100%', sm: '1px' },
                  variant: 'middle',
                }}
                // orientation="vertical"
                flexItem
                style={{}}
              />
            )}
          </>
        ))}
      </Grid>
    </Stack>
  );
}

export default InfoIntegrations;
