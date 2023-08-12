import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// -----------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  // const theme = useTheme();
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const SECONDARY_MAIN = theme.palette.secondary.main;
  // const dark = theme.palette.grey[800];

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <g>
          <path fill="#00EBD4" d="M436.71,268.089h165.012v-59.235h0.15c-4.227-88.854-75.291-154.436-162.34-154.436
		c-87.051,0-158.116,65.582-162.338,154.436h-1.265v211.555H436.71V268.089z"/>
          <path fill="#00EBD4" d="M758.276,792.748V589.653H601.723v156.551H487.484H436.71h-4.23v46.544h1.966
		c4.228,88.852,75.29,154.434,162.341,154.434s158.115-65.582,162.34-154.434H758.276z"/>
          <g>
            <path fill="#FFBA7E" d="M280.161,521.957V424.64v-4.231h-59.236v0.91C134.921,425.546,66.49,496.61,66.49,583.658
			c0,87.053,68.431,158.116,154.435,162.34v0.206H432.48V589.653H280.161V521.957z"/>
            <path fill="#FFBA7E" d="M813.279,264.768v-0.909H601.723v156.55h156.554v101.548v63.464v4.232h55.003v-0.205
			c88.854-4.225,154.436-75.29,154.436-162.34C967.715,340.06,902.133,268.995,813.279,264.768z"/>
          </g>
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
