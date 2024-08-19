import { ThemeProvider } from '@emotion/react';
import { createTheme, useMediaQuery } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

const AppLightTheme = createTheme({
  palette: {
    background: {
      default: 'rgb(243,252,255)',
      paper: 'rgb(255,255,255)',
    },
  },
});
const AppDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(33,37,39)',
      paper: 'rgb(41,41,49)',
    },
  },
});
const SYSTEM_THEME = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [theme, setTheme] = useState(AppLightTheme);

  useEffect(() => {
    switch (themeMode) {
      case 'light':
        setTheme(AppLightTheme);
        break;
      case 'dark':
        setTheme(AppDarkTheme);
        break;
      default:
        setTheme('light');
    }
  }, [themeMode]);

  const switchThemeMode = (mode) => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, switchThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
