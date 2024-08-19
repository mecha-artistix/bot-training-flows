import * as React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import HighLightText from './HighLightText';
import BannerImg from '../assets/img/Banner.svg';
import StaggeredText from './styled/StaggeredText';
import { motion, useInView } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';
import InfoIntegrations from './InfoIntegrations';
import Lottie from 'lottie-react';
import BannerGraph from '../assets/img/bannerGraph.json';

function BannerSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = isInView ? 'animate' : 'initial';
  const theme = useTheme();
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
    },
    sectionTitle: {
      textAlign: 'center',
      wordBreak: 'break-word', // or 'break-all'
      overflowWrap: 'break-word',
    },
    image: {
      margin: '0 auto',
      textAlign: 'center',
      '& img': { width: '100%', transform: { lg: 'scale(1.5)' } },
    },
  };
  return (
    <Box
      ref={ref}
      className="section-container"
      component={motion.section}
      style={style.container}
      variants={animationVariants.fadeIn.parent()}
      initial="initial"
      animate={animate}
    >
      <Box
        component={motion.div}
        sx={style.image}
        variants={animationVariants.bounceInUp.child(3)}
        initial="initial"
        animate={animate}
      >
        {/* <img src={BannerImg} /> */}
        <Lottie animationData={BannerGraph} />
      </Box>
      <Box sx={{ width: { lg: '1200px' }, mt: '100px' }}>
        <InfoIntegrations />
      </Box>
    </Box>
  );
}

export default BannerSection;
