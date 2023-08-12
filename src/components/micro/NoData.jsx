import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//
import Illustration from "../../assets/icons/illustration_doc";

const NoData = ({ text = "No data found", description = "", width = 260, sx, children }) => (
  <Stack className='ai-c m-auto py-2' spacing={2} sx={sx}>
    <Illustration sx={{ width }} />
    <Typography variant="h5">{text}</Typography>
    {description && <Typography variant="subtitle2" color="grey.600">{description}</Typography>}
    {children && <div>{children}</div>}
  </Stack>
)

export default NoData;

NoData.propTypes = {
  text: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.number,
  sx: PropTypes.object,
};
