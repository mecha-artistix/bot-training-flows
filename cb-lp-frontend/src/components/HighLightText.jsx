import * as React from 'react';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { ColorModeContext } from '../context/theme/ColorModeContext';

function HighLightText({ children }) {
  const theme = useTheme();
  const { mode } = React.useContext(ColorModeContext);
  const style = {
    // color: mode == 'dark' ? theme.palette.accent.light : theme.palette.accent.dark,
    color: theme.palette.highlight.main,
    // p: 1,
  };
  return (
    <Box component="span" sx={style}>
      {children}
    </Box>
  );
}

export default HighLightText;
