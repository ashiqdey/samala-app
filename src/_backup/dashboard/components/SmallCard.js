import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import SvgIconStyle from '../../../components/micro/SvgIconStyle';

// -----------------------------------------------

const SmallCard = ({ title, to, color, icon, children }) => (
  <Link to={to} className='c-inherit td-n'>
    <Stack component={Paper} elevation={1} direction='row' className='ai-c jc-sb p-15'>
      <Box sx={{ width: 'calc(100% - 100px)' }}>
        <Typography variant="overline" color='grey.500'>{title}</Typography>
        {children}
      </Box>
      <Box sx={{
        bgcolor: `${color}.lighter`,
        color: `${color}.main`,
        height: 80,
        width: 80
      }}
        className='br-1 p-1 d-c'>
        <SvgIconStyle
          src={`/assets/samala/${icon}`}
          sx={{ width: 45, height: 45 }}
        />
      </Box>
    </Stack>
  </Link>
);
SmallCard.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default SmallCard;

