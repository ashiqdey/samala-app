// import PropTypes from 'prop-types';
// @mui
import IconButton from '@mui/material/IconButton';

// components
import Iconify from './Iconify';
// hooks
import useSettings from '../../hooks/useSettings';

// -----------------------------------------------

export default function GridSwitch() {
  const { grid, onToggleGrid } = useSettings();

  return (
    <IconButton
      aria-label="change layout"
      onClick={() => onToggleGrid()}
      size='large'
      sx={{ color: 'grey.500' }}
      edge='end'
    >
      <Iconify icon={grid ? 'ic:round-grid-view' : 'ph:rows-fill'} />
    </IconButton>
  );
}


