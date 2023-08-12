import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link } from "react-router-dom"

// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
//
import { productUrl } from '../utils/formatString';
import { PATHS } from '../routes/paths';




export default function ProductSuggetionAdmin({ suggestions }) {
  const url = useCallback((title, id) => productUrl(title, id, true), []);

  if (suggestions.length === 0) {
    return null;
  }


  return (<Paper
    className='p-a zi-100 w-100 l-0 of-a'
    sx={{
      top: 44,
      height: 'calc(100vh - 44px)',
      borderTop: `1px dashed var(--grey-300)`,
      borderRadius: `0`,
    }}
  >
    {
      suggestions.map(e => <div key={e.id}>
        <Stack direction='row' className='py-1 jc-sb ai-c pr-1'>
          <Link
            to={url(e.title, e.id)}
            className='text-truncate-2 font6 td-n c-inherit pl-2'
            style={{ width: 'calc(100% - 70px)' }}
          >
            {e.title}
          </Link>

          <Box sx={{ width: '65px' }} className='ta-c'>
            <Button
              component={Link}
              to={`${PATHS.dashboard.editProducts}/${e.id}`}
            >
              Edit
            </Button>
          </Box>
        </Stack>
        <Divider className='w-100' />
      </div>)
    }
  </Paper>);
}
ProductSuggetionAdmin.propTypes = {
  suggestions: PropTypes.array
};

