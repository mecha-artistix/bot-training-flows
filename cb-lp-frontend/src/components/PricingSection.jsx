import * as React from 'react';
import { useTheme } from '@emotion/react';
import {
  Box,
  Stack,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Checkbox,
  Paper,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Subheading from './Subheading';
// import PriceBanner from './PriceBanner';

const prices = [
  {
    name: 'Trial',
    tag: 'Suitable for Small Companies',
    price: '0',
    features: ['1 Active chatbot', '300 free chats per month', 'All integrations'],
    recommended: false,
  },
  {
    name: 'Basic',
    tag: 'Suitable for Small Companies',
    price: '20',
    features: ['1 Active chatbot', '300 free chats per month', 'All integrations'],
    recommended: false,
  },
  {
    name: 'Standard',
    tag: 'Suitable for Medium Companies',
    price: '35',
    features: ['3 Active chatbot', '300 free chats per month', 'All integrations'],
    recommended: true,
  },
  {
    name: 'Premium',
    tag: 'Suitable for Large Companies',
    price: '52',
    features: ['10 Active chatbot', '300 free chats per month', 'All integrations'],
    recommended: false,
  },
];

function PricingSection() {
  const theme = useTheme();

  const [selected, setSelected] = React.useState(0);

  const style = {
    section: { gap: 8 },
    row: { justifyContent: 'space-between', alignItems: 'center' },
    // sectionTitle: { m: 2 },
    // gridItem: { height: '100%', border: '1px solid black' },
    titleText: { textAlign: 'center' },

    priceBanner: {
      // px: '20px',
      py: '30px',
      textAlign: 'center',
      width: '400px',
    },
    // priceHead: {
    //   borderBottom: `1px solid ${theme.palette.grey[200]}`,
    //   borderRadius: '10px',
    // },
    // packageList: {
    //   width: `calc(100% - 50px)`,
    //   margin: '0 auto',
    // },
    pricesContainer: {
      display: { xs: 'none', sm: 'none', md: 'flex' },
      width: { md: '1000px' },
      margin: '0 auto',
      direction: 'row',
      justifyContent: 'space-around',
      alignItems: 'stretch',
    },

    features: {
      height: '100%',
      bgcolor: theme.palette.bg.light,
      borderRadius: 8,
      padding: { md: '20px' },
    },
    features_list: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // width: 'clamp(360px, 80%, 80%)',
      height: 'inherit',
    },
    features_list_item: {
      // my: 3,
    },
    packageListCont: {
      '& .active': {
        bgcolor: theme.palette.bgcard.dark,
        boxShadow: theme.customShadows.glowingShadow[theme.palette.mode],
      },
    },
    packageItem: {
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      my: 2,
      py: 2,
      px: 1,
      border: theme.border.thin,
      '&:hover': {
        boxShadow: theme.customShadows.glowingShadow[theme.palette.mode],
      },
    },
    focus: {},
    pricesContainerMobile: {
      display: { xs: 'flex', sm: 'flex', md: 'none' },
      p: 4,
      gap: 5,
      '& .price-card': {
        borderRadius: 5,
        '& .card-child': { p: 3 },
        '& .recommend': {
          fontSize: '0.7rem',
          // borderRadius: '999px',
          // px: 2,
          // bgcolor: 'pink',
        },
      },
      '& .recommended': {
        bgcolor: theme.palette.accent.light,
      },
    },
  };

  const itemClickHandler = (index) => {
    setSelected(index);
  };
  return (
    <Stack component="section" direction="column" sx={style.section} className="section-container">
      {/* SECTION TITLE + DESCRIPTION */}
      <Grid container sx={style.row}>
        <Grid item xs={12} md={6} sx={style.gridItem}>
          <Box>
            <Subheading>Pricing</Subheading>
            <Typography variant="h2">Flexible pricing that scales with your growth</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={style.gridItem}>
          <Box>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus perspiciatis numquam ab in incidunt,
              neque similique sunt accusantium officia distinctio obcaecati, odit itaque quibusdam ut veniam inventore
              placeat voluptatem quaerat.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {/* PRICING Row Desktop */}
      <Grid container sx={style.pricesContainer}>
        {/* FEATURES LIST*/}
        <Grid item sm={12} md={5} sx={style.gridItem}>
          <Box sx={style.features}>
            <List sx={style.features_list}>
              {prices[selected].features.map((feature, i) => (
                <ListItem disablePadding key={i} sx={style.features_list_item}>
                  <ListItemText>{feature}</ListItemText>
                  <ListItemIcon>
                    <CheckIcon color="secondary" />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        {/* PACKAGES LIST*/}
        <Grid item sm={12} md={5} sx={style.gridItem}>
          <Box sx={style.packageListCont}>
            {prices.map((item, i) => (
              <Grid
                container
                key={i}
                onClick={() => itemClickHandler(i)}
                sx={{ ...style.packageItem }}
                className={i === selected ? 'active' : ''}
              >
                <Checkbox
                  checked={i === selected ? true : false}
                  labelStyle={{ color: 'white' }}
                  iconStyle={{ fill: 'white' }}
                />
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: '1.3rem' }}>{item.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: '2rem' }}>
                      ${item.price}
                    </Box>
                    /month
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>

        {/* PRICE BANNER END*/}
        <Grid item xs={12} textAlign="right">
          <Button variant="contained" color="accent">
            Get Access
          </Button>
        </Grid>
      </Grid>
      {/*  PRICING CONTAINER MOBILE  */}
      <Stack sx={style.pricesContainerMobile}>
        {prices.map((item, i) => (
          <Paper key={i} elevation={2} className={`price-card ${item.recommended ? 'recommended' : ''}`}>
            <Box className="card-child price-header">
              <Stack direction="row" justifyContent="space-between" alignContent="center">
                <Typography>{item.name}</Typography>
                {item.recommended && <Box className="recommend">Recommended</Box>}
              </Stack>
              <Typography sx={{ fontSize: '3rem', fontWeight: '700' }}>
                {item.price}
                <Box component="span" sx={{ marginLeft: 1, fontSize: '0.8rem' }}>
                  per Month
                </Box>
              </Typography>
            </Box>
            <Divider />
            <Box className="card-child price-body">
              {item.features.map((feature, i) => (
                <ListItem disablePadding key={i} sx={{ gap: 1 }}>
                  <ListItemIcon style={{ minWidth: '30px' }}>
                    <CheckIcon color="accent" />
                  </ListItemIcon>
                  <ListItemText>{feature}</ListItemText>
                </ListItem>
              ))}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
}

function PriceBanner() {
  return <div>PriceBanner</div>;
}

export default PricingSection;
