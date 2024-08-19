import * as React from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import img1 from '../assets/img/dev/1.jpg';
import img2 from '../assets/img/dev/2.jpg';
import img3 from '../assets/img/dev/3.jpg';
import { Tab, Tabs, Box, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function FeaturesTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const list = [
    {
      icon: <SmartToyIcon fontSize="large" />,
      title: 'Dashboard',
      description:
        'This item could provide a snapshot of the most important metrics or data points related to the product.',
      imageLight: img1,
      imageDark: img1,
    },
    {
      icon: <SmartToyIcon fontSize="large" />,
      title: 'Mobile integration',
      description: 'This item could provide information about the mobile app version of the product.',
      imageLight: img2,
      imageDark: img2,
    },
    {
      icon: <SmartToyIcon fontSize="large" />,
      title: 'Available on all platforms',
      description:
        'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
      imageLight: img3,
      imageDark: img3,
    },
  ];

  return list.map((item, i) => (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab icon={item.icon} label={item.title} iconPosition="start" />
      </Tabs>
      <TabPanel value={value} index={i}>
        {item.description}
      </TabPanel>
    </>
  ));
}

export default FeaturesTabs;
