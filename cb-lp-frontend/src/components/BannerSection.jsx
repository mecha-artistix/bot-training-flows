import * as React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Typography, Grid } from '@mui/material';
import HighLightText from './HighLightText';
import BannerBot from '../assets/img/banner/bannerBot.svg';
import BannerImg1 from '../assets/img/banner/banner1.png';
import imgChat1 from '../assets/img/banner/imgChat1.png';
import imgChat2 from '../assets/img/banner/imgChat2.png';
import imgChat3 from '../assets/img/banner/imgChat3.png';
import imgChat4 from '../assets/img/banner/imgChat4.png';
import imgChat5 from '../assets/img/banner/imgChat5.png';
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
      // display: 'flex',
      // flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      // gap: 3,
    },
    sectionTitle: {
      textAlign: 'center',
      wordBreak: 'break-word', // or 'break-all'
      overflowWrap: 'break-word',
    },
    image: {
      margin: '0 auto',
      textAlign: 'center',
      '& .banner-img-1': { width: { lg: '750px' } },
      '& .img-bot': { width: '100%', maxWidth: '400px' },
    },
    imgChat: { position: 'absolute', width: '100px', height: '100px', top: '50%', left: '50%' },
    imgChat1: { transform: 'translate(-20%, -50%) rotate(0deg) translateY(-300px) rotate(0deg)' },
    imgChat2: { transform: 'translate(-20%, -50%) rotate(72deg) translateY(-300px) rotate(-72deg)' },
    imgChat3: { transform: 'translate(-20%, -50%) rotate(144deg) translateY(-300px) rotate(-144deg)' },
    imgChat4: { transform: 'translate(-20%, -50%) rotate(216deg) translateY(-300px) rotate(-216deg)' },
    imgChat5: { transform: 'translate(-20%, -50%) rotate(288deg) translateY(-300px) rotate(-288deg)' },
  };
  return (
    <Grid
      ref={ref}
      container
      className="section-container"
      component={motion.section}
      style={style.container}
      variants={animationVariants.fadeIn.parent()}
      initial="initial"
      animate={animate}
    >
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <Box
          component={motion.div}
          sx={style.image}
          variants={animationVariants.fadeIn.child(3)}
          initial="initial"
          animate={animate}
        >
          <img src={BannerImg1} className="banner-img-1" width="100%" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <Box
          component={motion.div}
          sx={style.image}
          position="relative"
          variants={animationVariants.fadeIn.child(3)}
          initial="initial"
          animate={animate}
        >
          <motion.img
            src={imgChat1}
            className="imgChat imgChat-1"
            style={{ ...style.imgChat, ...style.imgChat1 }}
            variants={animationVariants.fadeIn.child(5)}
          />
          <motion.img
            src={imgChat2}
            className="imgChat imgChat-2"
            style={{ ...style.imgChat, ...style.imgChat2 }}
            variants={animationVariants.fadeIn.child(10)}
          />
          <motion.img
            src={imgChat3}
            className="imgChat imgChat-3"
            style={{ ...style.imgChat, ...style.imgChat3 }}
            variants={animationVariants.fadeIn.child(15)}
          />
          <motion.img
            src={imgChat4}
            className="imgChat imgChat-4"
            style={{ ...style.imgChat, ...style.imgChat4 }}
            variants={animationVariants.fadeIn.child(20)}
          />
          <motion.img
            src={imgChat5}
            className="imgChat imgChat-5"
            style={{ ...style.imgChat, ...style.imgChat5 }}
            variants={animationVariants.fadeIn.child(25)}
          />
          <img src={BannerBot} className="img-bot" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box sx={{ width: { lg: '1200px' }, mt: '100px' }}>
          <InfoIntegrations />
        </Box>
      </Grid>
    </Grid>
  );
}

export default BannerSection;
