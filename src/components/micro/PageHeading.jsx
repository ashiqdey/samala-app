import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
//
import Breadcrumbs from './Breadcrumbs';

// -----------------------------------------------

PageHeading.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.array,
  children: PropTypes.node
};
export default function PageHeading({ title, subtitle, breadcrumbs, children }) {
  return <>
    <Stack direction="row" justifyContent="space-between" alignItems='center'>
      <Box>
        <Typography variant='h3'>{title}</Typography>
        {subtitle && <Typography variant='subtitle1'>{subtitle}</Typography>}

        {breadcrumbs && <Breadcrumbs links={breadcrumbs} />}
      </Box>

      {children}
    </Stack>

    <Divider className='my-3' />
  </>
}