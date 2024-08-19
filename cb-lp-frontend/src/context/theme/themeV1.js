import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import PressStart2p from './assets/fonts/PressStart2P-Regular.ttf';

let theme = createTheme({
  typography: {
    h1: {
      fontSize: '5rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#281159',
      dark: '#1F0D45',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#BFAA6B',
      dark: '#ba000d',
      contrastText: '#000',
    },
    accent: {
      light: '#FBF19E',
      main: '#FBE000',
      dark: '#ba000d',
      contrastText: '#000',
    },
    light_grey: {
      light: '#D9D9D9',
      main: '#D9D9D9',
      dark: '#ba000d',
      contrastText: '#000',
    },
    dark_grey: {
      light: '#ff7961',
      main: '#737373',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1920,
    },
  },
});

theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 2, // Adjust scaling factor
});

export default theme;
