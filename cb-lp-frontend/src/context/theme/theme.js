import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { adjustOpacity } from '../../utils/adjustOpacity';

const baseConfig = {
  typography: {
    h1: {
      fontSize: '5rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '4rem',
      fontWeight: 800,
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
    small: {
      fontSize: '0.875rem',
      fontWeight: 'light',
      opacity: '0.7',
      textTransform: 'capitalize',
      // letterSpacing: '1rem',
    },
    subheading: {
      fontSize: '0.875rem',
      fontWeight: 900,
      opacity: '1',
      textTransform: 'uppercase',
      letterSpacing: '1rem',
    },
  },
  gap: {
    small: 1,
    medium: 3,
    large: 5,
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
      light: 'rgba(254, 226, 190, 0.2)',
      main: 'rgba(254, 193, 112, 1)',
      dark: 'rgba(180, 122, 38, 1)',
      contrastText: '#190000',
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
};

const lightMode = {
  palette: {
    mode: 'light',
    primary: {
      light: '#757ce8',
      main: '#281159',
      dark: '#1F0D45',
      contrastText: '#212121',
    },
    secondary: {
      light: '#ff7961',
      main: '#BFAA6B',
      dark: '#ba000d',
      contrastText: '#000',
    },
    highlight: {
      main: 'rgba(180, 122, 38, 1)',
    },
    bg: { light: '#f9f9fb' },
    bgcard: {
      light: 'rgba(117, 124, 232, 0.1)',
      main: 'rgba(117, 124, 232, 0.3)',
      dark: 'rgba(117, 124, 232, 0.6)',
    },
    background: {
      default: '#fff', // light background color (fallback)
      paper: '#ffffff', // paper background color
    },
    text: {
      primary: '#212121',
    },
  },
};

const darkMode = {
  palette: {
    mode: 'dark',
    // primary: {
    //   light: '#757ce8',
    //   main: '#281159',
    //   dark: '#1F0D45',
    //   contrastText: '#fff',
    // },
    secondary: {
      light: '#ff7961',
      main: '#BFAA6B',
      dark: '#ba000d',
      contrastText: '#000',
    },
    highlight: {
      main: 'rgba(254, 193, 113, 1)',
    },
    bgcard: {
      light: 'rgba(254, 193, 113, 0.1)',
      main: 'rgba(254, 193, 113, 0.3)',
      dark: 'rgba(254, 193, 113, 0.6)',
    },
    bg: { light: '#262626' },
    background: {
      default: '#000', // dark background color (fallback)
      paper: '#1d1d1d', // paper background color
    },
    text: {
      primary: '#ffffff',
    },
    // other dark mode configurations
  },
};

export const createAppTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      ...baseConfig,
      palette: {
        ...baseConfig.palette,
        ...(mode === 'light' ? lightMode.palette : darkMode.palette),
      },
      border: {
        thick: '4px solid #000',
        thin: `1px solid 
        ${mode == 'dark' ? darkMode.palette.bgcard.main : lightMode.palette.bgcard.main}`,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: (theme) => ({
            body: {
              // backgroundImage:
              //   mode === 'dark'
              //     ? `linear-gradient(
              //     ${adjustOpacity(theme.palette.accent.dark, 0.2)},
              //     ${adjustOpacity(theme.palette.accent.light, 0)})`
              //     : `linear-gradient(
              //     ${adjustOpacity(theme.palette.accent.dark, 1)},
              //     ${adjustOpacity(theme.palette.accent.light, 0.2)}`,
              // backgroundColor:
              //   mode === 'dark' ? darkMode.palette.background.default : lightMode.palette.background.default,
              // backgroundRepeat: 'no-repeat',
              // backgroundAttachment: 'fixed',
            },
            '.section-container': {
              marginBottom: 'clamp(40px, 60px, 80px)',
              // marginBottom: '421px',

              // 'section:not(:last-of-type)': { marginBottom: 0 },
            },
            // 'section:not(:last-of-type)': {
            //   // marginBottom: 'clamp(40px, 60px, 80px)',
            //   marginBottom: '421px',
            // },

            '.active': {},
          }),
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '0px',
              textTransform: 'capitalize',
              padding: '8px 16px',
              fontWeight: '600',
            },
            contained: {
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: mode == 'dark' ? baseConfig.palette.accent.main : baseConfig.palette.accent.dark, //
              color: mode === 'dark' ? '#190000' : '#190000',
              '&:hover': {
                backgroundColor: mode == 'dark' ? baseConfig.palette.accent.dark : baseConfig.palette.accent.main,
              },
            },
            outlined: {
              color: mode === 'dark' ? '#fff' : '#212121',
              borderColor: mode == 'dark' ? baseConfig.palette.accent.light : baseConfig.palette.accent.dark,
              '&:hover': {
                borderColor: mode == 'dark' ? baseConfig.palette.accent.dark : baseConfig.palette.accent.light,
              },
            },
            text: {
              color: mode === 'dark' ? '#fff' : '#fff',
              // fontSize: '56px',
              '&:hover': {
                backgroundColor: mode === 'light' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(48, 63, 159, 0.1)', // Hover background color
              },
            },
          },
        },
        MuiPaper: {
          variants: [
            {
              props: { variant: 'glass' },
              style: {
                backgroundColor: '#f0f0f0',
                padding: '16px',
                borderRadius: '8px',
              },
            },
            {
              props: { variant: 'customBoxShadow' },
              style: {
                boxShadow:
                  mode === 'light'
                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                    : `0 0 1px ${adjustOpacity(baseConfig.palette.accent.dark, 0.7)}, 
                     1px 1.5px 2px -1px ${adjustOpacity(baseConfig.palette.accent.main, 0.65)}, 
                     4px 4px 12px -2.5px ${adjustOpacity(baseConfig.palette.accent.light, 0.65)}`,
              },
            },
          ],
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: (theme) => theme.palette.primary.main,
              '&.Mui-checked': {
                color: (theme) => theme.palette.primary.main,
                border: (theme) => theme.palette.primary.main,
              },
            },
          },
        },
      },
      customShadows: {
        glowingShadow: {
          light: `0 0 1px ${lightMode.palette.bgcard.dark} , 1px 1.5px 2px -1px ${lightMode.palette.bgcard.dark}, 4px 4px 12px -2.5px ${lightMode.palette.bgcard.dark}`,
          dark: ` 0 0 1px ${adjustOpacity(baseConfig.palette.accent.dark, 0.7)}, 
                  1px 1.5px 2px -1px ${adjustOpacity(baseConfig.palette.accent.main, 0.65)}, 
                  4px 4px 12px -2.5px ${adjustOpacity(baseConfig.palette.accent.light, 0.65)}`,
        },
        glowingShadow_light: {
          light: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
          dark: `0 0 1px ${adjustOpacity(baseConfig.palette.accent.dark, 0.7)}`,
        },
      },
    }),
    {
      breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
      factor: 2,
    }
  );
