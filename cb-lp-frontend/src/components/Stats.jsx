import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useThemeProps } from '@mui/material/styles';

const StatRoot = styled('div', {
  name: 'Stat',
  slot: 'root',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  //   gap: theme.spacing(0.5),
  //   padding: theme.spacing(3, 4),
  //   backgroundColor: theme.palette.background.paper,
  //   borderRadius: theme.shape.borderRadius,
  //   boxShadow: theme.shadows[2],
  //   ...(ownerState.variant === 'outlined' && {
  //     border: `2px solid ${theme.palette.divider}`,
  //     boxShadow: 'none',
  //   }),
}));

const StatHead = styled('div', {
  name: 'Stat',
  slot: 'header',
})(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(1),
}));

const StatBody = styled('div', {
  name: 'Stat',
  slot: 'body',
})(({ theme, ownerState }) => ({
  display: 'flex',
  flexDirection: ownerState.flexDirection,
  gap: theme.spacing(1),
}));

const Stat = React.forwardRef(function Stat(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'Stat' });
  const { headContent, bodyContent, flexDirection = 'row', ...other } = props;

  const ownerState = { flexDirection };

  return (
    <StatRoot ref={ref} ownerState={ownerState} {...other}>
      <StatHead>{headContent}</StatHead>
      <StatBody ownerState={ownerState}>
        {bodyContent.map((content, index) => (
          <span key={index}>{content}</span>
        ))}
      </StatBody>
    </StatRoot>
  );
});

Stat.propTypes = {
  headContent: PropTypes.node.isRequired,
  bodyContent: PropTypes.arrayOf(PropTypes.node).isRequired,
  flexDirection: PropTypes.oneOf(['row', 'column']),
};

export default Stat;
