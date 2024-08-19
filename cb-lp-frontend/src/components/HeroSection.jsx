import * as React from 'react';

import { Stack, Box, Typography, useTheme, Divider, Paper } from '@mui/material';
import Lottie from 'lottie-react';
import Newsletter from './Newsletter';
import HeroBotLight from '../assets/img/bot_light.json';
import HeroBotDark from '../assets/img/bot_dark.json';
import ParticleBackground from '../assets/ParticleBackground';
import { ColorModeContext } from '../context/theme/ColorModeContext';
import InfoIntegrations from './InfoIntegrations';
import HighLightText from './HighLightText';
import Stat from './Stats';
import StarIcon from '@mui/icons-material/Star';
import { motion, useInView } from 'framer-motion';
import StaggeredText from './styled/StaggeredText';
import { animationVariants } from '../context/theme/animationVariants';
import BannerImg from '../assets/img/Banner.svg';

function HeroSection() {
  const theme = useTheme();
  const { mode } = React.useContext(ColorModeContext);
  // const animationData = mode == 'light' ? HeroBotLight : HeroBotDark;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = isInView ? 'animate' : 'initial';
  const modeColor = mode == 'dark' ? theme.palette.accent.main : theme.palette.accent.dark;
  const style = {
    container: {
      py: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    child: {
      flex: '1',
    },
    heroHeadingBox: {
      // maxWidth: '750px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      '& h1': {
        fontSize: 'clamp(2rem, 5vw, 5rem)',
        fontWeight: 'clamp(500, 600, 800)',
        // maxWidth: '750px',
      },
    },
    img: {
      textAlign: 'center',
    },
    image: {
      textAlign: 'center',
      width: '100%',
    },
  };
  return (
    <>
      {/* <ParticleBackground /> */}
      <Stack
        ref={ref}
        component={motion.section}
        direction="column"
        className="HeroSection section-container"
        sx={style.container}
        variants={animationVariants.fadeIn.parent()}
        initial="initial"
        animate={animate}
      >
        <Box sx={style.heroHeadingBox}>
          <Typography component={motion.h1} variant="h1" variants={animationVariants.bounceInUp.child(1)}>
            Boost your leads generation with an
            <HighLightText>
              <StaggeredText>AI-Powered Chatbot</StaggeredText>
            </HighLightText>
          </Typography>
          <Typography
            component={motion.p}
            sx={{ letterSpacing: 20, mt: 1, ml: 1, fontWeight: '600' }}
            variants={animationVariants.bounceInUp.child(3)}
          >
            It's all about your ease!
          </Typography>
          <Box sx={{ width: { lg: '750px' }, alignSelf: 'center' }}>
            <Newsletter />
          </Box>
          <Stack
            direction="row"
            component={motion.div}
            spacing={2}
            justifyContent="center"
            variants={animationVariants.fadeInUp.parent(5)}
          >
            <Stat
              headContent={Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  color="accent"
                  sx={{ color: modeColor }}
                  component={motion.svg}
                  variants={animationVariants.bounceInUp.child(i)}
                  transition={{ repeat: Infinity, repeatDelay: 0.5 }}
                />
              ))}
              bodyContent={[
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} key={0}>
                  5/5
                </Typography>,
                <Typography key={1} variant="small">
                  Ratings
                </Typography>,
              ]}
              flexDirection="row"
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Stat
              headContent={<Typography variant="small">Sales</Typography>}
              bodyContent={[
                <Typography variant="h4" sx={{ fontWeight: 'bold' }} key={0}>
                  2.5K+
                </Typography>,
              ]}
              flexDirection="row"
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default HeroSection;
