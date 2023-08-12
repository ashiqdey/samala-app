import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// -----------------------------------------------

DocHeader.propTypes = {
  title: PropTypes.string,
  sx: PropTypes.object,
  variant: PropTypes.string,
  children: PropTypes.node,
};
export default function DocHeader({ title, sx = {}, variant = 'h4', children, ...rest }) {
  return <Box  {...rest}>
    <Typography variant={variant} sx={sx} > {title}</Typography>
    {children}
  </Box >
}