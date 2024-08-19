import * as React from 'react';
import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';

function Subheading({ children }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2, rootMargin: '-50px 0px' });
  const animate = isInView ? 'animate' : 'initial';
  const theme = useTheme();
  const style = {
    textTransform: 'uppercase',
    color: theme.palette.highlight.main,
  };
  return (
    <Typography
      ref={ref}
      variant="subheading"
      component={motion.span}
      sx={style}
      variants={animationVariants.bounceInUp.child(1)}
      initial="initial"
      animate={animate}
    >
      {children}
    </Typography>
  );
}

export default Subheading;
