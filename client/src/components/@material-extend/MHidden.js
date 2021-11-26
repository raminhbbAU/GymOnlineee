import PropTypes from 'prop-types';
// material
import { useMediaQuery } from '@mui/material';

// ----------------------------------------------------------------------

MHidden.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOf([
    'xsDown',
    'smDown',
    'mdDown',
    'lgDown',
    'xlDown',
    'xsUp',
    'smUp',
    'mdUp',
    'lgUp',
    'xlUp'
  ]).isRequired
};

export default function MHidden({ width, children }) {

  console.log('////////////////\\\\\\\\\\\\\\\\\\');
  console.log(width);
  console.log(children);

  const breakpoint = width.substring(0, 2);

  console.log(breakpoint);

  const hiddenUp = useMediaQuery((theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme) => theme.breakpoints.down(breakpoint));

  console.log(hiddenUp);
  console.log(hiddenDown);

  if (width.includes('Down')) {
    return hiddenDown ? null : children;
  }

  if (width.includes('Up')) {
    return hiddenUp ? null : children;
  }

  return null;
}
