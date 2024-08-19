import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';

function Newsletter() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = isInView ? 'animate' : 'initial';
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    // Handle form submission logic here
    console.log('Email submitted:', email);
    setError('');
    setEmail('');
  };

  const style = { maxWidth: '100%', padding: 2 };

  return (
    <Box
      ref={ref}
      component={motion.div}
      sx={style}
      variants={animationVariants.fadeInUp.parent(1)}
      initial="initial"
      animate={animate}
    >
      <form onSubmit={handleSubmit} className="news-letter">
        <TextField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          variant="outlined"
          fullWidth
          error={Boolean(error)}
        />
        <Button type="submit" variant="contained" sx={{ display: 'inline-block', width: 'auto' }}>
          Sign up free
        </Button>
      </form>
      {/* <input type="submit" value="Sign Up free" /> */}
    </Box>
  );
}

export default Newsletter;
