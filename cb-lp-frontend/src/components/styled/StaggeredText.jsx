import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const DURATION = 0.25;
const STAGGER = 0.025;
const INTERVAL = 3;

const StaggeredText = ({ children }) => {
  return (
    <Box
      component={motion.div}
      initial="initial"
      animate="animate"
      sx={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        // lineHeight: 0.75,
      }}
    >
      <Box component="span" sx={{ display: 'inline-block' }}>
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: {
                y: 0,
              },
              animate: {
                y: '-100%',
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
              repeat: Infinity,
              repeatDelay: INTERVAL,
            }}
            style={{ display: 'inline-block' }}
            // style={{ display: 'inline-block', whiteSpace: l === ' ' ? 'pre' : 'normal' }}
          >
            {l === ' ' ? '\u00A0' : l} {/* Use a non-breaking space for actual space characters */}
          </motion.span>
        ))}
      </Box>

      <Box
        component="span"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'inline-block',
        }}
      >
        {children.split('').map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: {
                y: '100%',
              },
              animate: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: 'easeInOut',
              delay: STAGGER * i,
              repeat: Infinity,
              repeatDelay: INTERVAL,
            }}
            style={{ display: 'inline-block', whiteSpace: l === ' ' ? 'pre' : 'normal' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </Box>
    </Box>
  );
};

export default StaggeredText;
