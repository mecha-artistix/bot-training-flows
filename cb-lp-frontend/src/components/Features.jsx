import React, { useState, useEffect, useRef } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Grid, Stack, Box, Typography } from '@mui/material';
import dashboardImg from '../assets/img/dashboard.png';
import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import flowchartsImg from '../assets/img/flowcharts.png';
import FlowchartIcon from '@mui/icons-material/AccountTree';
import leadsImg from '../assets/img/leads.png';
import LeadsIcon from '@mui/icons-material/GroupAdd';
import Subheading from './Subheading';
import { useTheme } from '@emotion/react';
import FeaturesTabs from './FeaturesTabs';
import { motion, AnimatePresence } from 'framer-motion';
import { animationVariants } from '../context/theme/animationVariants';
const list = [
  {
    icon: <DashboardIcon fontSize="large" />,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    imageLight: dashboardImg,
    imageDark: dashboardImg,
  },
  {
    icon: <FlowchartIcon fontSize="large" />,
    title: 'Flowcharts',
    description: 'This item could provide information about the mobile app version of the product.',
    imageLight: flowchartsImg,
    imageDark: flowchartsImg,
  },
  {
    icon: <LeadsIcon fontSize="large" />,
    title: 'Leads Genaration',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight: leadsImg,
    imageDark: leadsImg,
  },
];

function Features() {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);

  const itemClickHandler = (index) => {
    setSelected(index);
  };

  const style = {
    section: { gap: 2 },
    row: { justifyContent: 'center', alignItems: 'center' },
    // title: {
    //   '& h2': {
    //     fontSize: '4rem',
    //     fontWeight: '800',
    //   },
    // },
    gridItem: { p: 2 },
    featureImg: {
      height: '100%',
      bgcolor: theme.palette.bg.light,
      textAlign: 'center',
      borderRadius: 8,
      py: 8,
      '& img': {
        margin: '0 auto',
        // width: '60%',
        // aspectRatio: '3/2',
      },
    },
    list: {
      gap: 2,
      '& .active': {
        boxShadow: `inset 10px 0 0 ${theme.palette.bgcard.dark}`,
        '& :not(:last-child)': {
          color: theme.palette.bgcard.dark,
        },
      },
    },
    listItem: {
      p: 2,
      justifyContent: 'flex-end',
      cursor: 'pointer',
      transition: 'boxShadow 0.1s ease',
      borderLeft: `1px solid ${theme.palette.bgcard.dark}`,
      '&:hover': {
        boxShadow: `inset 10px 0 0 ${theme.palette.bgcard.dark}`,
        '& :not(:last-child)': {
          color: theme.palette.bgcard.dark,
        },
      },
    },
  };

  return (
    <Stack component={motion.section} direction="column" sx={style.section} className="section-container">
      {/* TITLE + DESCRIPTION */}
      <Grid container sx={style.row} justifyContent="center">
        <Grid item xs={12} md={7} sx={style.gridItem}>
          <Box sx={style.title}>
            <Subheading>Solutions</Subheading>
            <Typography variant="h2">Build a bot that's truly you own.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={style.gridItem}>
          <Box>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus perspiciatis numquam ab in incidunt,
              neque similique sunt accusantium officia distinctio obcaecati, odit itaque quibusdam ut veniam inventore
              placeat voluptatem quaerat.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {/* FEATURES TOGGLE */}
      <Grid container sx={style.row}>
        {/*  COLUMN WHERE AN IMAGE GETS RENDERED WHEN RELATED TAB IS CLCIKED */}
        <Grid item sm={12} md={7} sx={style.gridItem}>
          <Box sx={style.featureImg}>
            <AnimatePresence mode="wait">
              <motion.img
                src={list[selected].imageLight}
                key={selected}
                // variants={animationVariants.fadeInUp.child(1)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              />
            </AnimatePresence>
          </Box>
        </Grid>
        <Grid item sm={12} md={5} sx={style.gridItem}>
          <Stack sx={style.list}>
            {/*  LIST OF TABS THAT ACTS AS BUTTONS */}
            {list.map((item, i) => (
              <Grid
                key={i}
                container
                sx={style.listItem}
                onClick={() => itemClickHandler(i)}
                className={i === selected ? 'active' : ''}
              >
                <Grid item xs={2} sm={1} md={1}>
                  {item.icon}
                </Grid>
                <Grid item xs={10} sm={11} md={11}>
                  <Typography variant="h4">{item.title}</Typography>
                </Grid>
                <Grid item xs={12} md={11}>
                  <Typography>{item.description}</Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Grid>
      </Grid>
      {/* { FEATURES TABS } */}
    </Stack>
  );
}

export default Features;
