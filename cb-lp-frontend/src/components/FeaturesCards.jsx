import * as React from 'react';
import { Box, Card, CardMedia, duration, Grid, Paper, Stack, Typography } from '@mui/material';
import Subheading from './Subheading';
import { useTheme } from '@emotion/react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { animate, delay, motion, useInView } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';

const cardsData = [
  {
    media: <SmartToyIcon />,
    title: 'title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur doloribus magni quidem nulla laborum.',
  },
  {
    media: <SmartToyIcon />,
    title: 'title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur doloribus magni quidem nulla laborum.',
  },
  {
    media: <SmartToyIcon />,
    title: 'title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur doloribus magni quidem nulla laborum.',
  },
  {
    media: <SmartToyIcon />,
    title: 'title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur doloribus magni quidem nulla laborum.',
  },
  {
    media: <SmartToyIcon />,
    title: 'title',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur doloribus magni quidem nulla laborum.',
  },
];

const variants = {
  initial: { opacity: 0, y: '-100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', mass: 0.1, damping: 8, when: 'beforeChildren', staggerChildren: 0.2 },
  },
};
const childVariants = {
  initial: { opacity: 0, y: '20%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', mass: 0.4, damping: 8, duration: 0.1, ease: 'easeInOut' },
  },
};

function FeaturesCards() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const theme = useTheme();
  const style = {
    section: {},
    sectionTitle: {
      textAlign: 'center',
    },
    cardscont: {
      display: 'flex',
      justifyContent: 'center',
      gap: theme.gap.large,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      p: 3,
      gap: theme.gap.medium,
      cursor: 'pointer',
      '& .card-icon': {
        display: 'inline-block',
        width: 'auto',
        p: 1,
        // bgcolor: 'pink',
        '& svg': {
          color: theme.palette.accent.main,
          fontSize: '50px',
        },
      },
      '&:hover': {
        bgcolor: theme.palette.bgcard.light,
        boxShadow: theme.customShadows.glowingShadow[theme.palette.mode],
      },
    },
  };
  return (
    <Stack
      className="section-container"
      component={motion.section}
      direction="column"
      variants={animationVariants.fadeIn.parent()}
    >
      <Box component={motion.div} sx={style.sectionTitle}>
        <Subheading
        // component={motion.span}
        // variants={animationVariants.slideInUp.child(10)}
        // initial="initial"
        // animate="animate"
        >
          Features
        </Subheading>
        <Typography
          component={motion.h2}
          variant="h2"
          variants={animationVariants.slideInUp.child(10)}
          initial="initial"
          animate="animate"
        >
          Customer are always connected
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam quisquam quasi obcaecati repudiandae
          veniam placeat nisi nihil accusamus sunt ipsum?
        </Typography>
      </Box>
      {/* CARDS */}
      <Grid
        ref={ref}
        component={motion.div}
        container
        sx={style.cardscont}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
      >
        {cardsData.map((card, i) => (
          <Grid
            key={i}
            component={motion.div}
            variants={animationVariants.bounceInUp.child(i)}
            item
            xs={12}
            sm={5}
            md={4}
            lg={3}
          >
            <Paper square={false} elevation={4} sx={style.card}>
              <Paper square={false} elevation={4} padding={3}>
                <Box className="card-icon">{card.media}</Box>
              </Paper>
              <Typography variant="h4" className="card-title">
                {card.title}
              </Typography>
              <Typography className="card-desc">{card.body}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default FeaturesCards;
