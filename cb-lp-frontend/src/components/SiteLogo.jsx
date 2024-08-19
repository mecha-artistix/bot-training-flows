import * as React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import LogoLight from '../assets/LogoLight.svg';
import LogoDark from '../assets/LogoDark.svg';
import { ColorModeContext } from '../context/theme/ColorModeContext';

function SiteLogo() {
  const theme = useTheme();
  const { mode } = React.useContext(ColorModeContext);
  const style = {
    display: { xs: 'none', md: 'block' },
    alignItems: 'center',
    fontFamily: 'PressStart2p',
    fontSize: {
      sm: '0.6rem',
      md: '1.2rem',
    },
    color: theme.palette.accent.dark,
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <img src={mode == 'light' ? LogoLight : LogoDark} alt="Logo" />
      <Typography sx={style}>{import.meta.env.VITE_SITE_NAME}</Typography>
    </div>
  );
}

export default SiteLogo;
