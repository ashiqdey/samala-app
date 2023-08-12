import React, { Suspense } from 'react';
// @mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// -----------------------------------------------

const Loader = () => (
  <Box className="p-f w-100 t-0 l-0 zindex-9999">
    <LinearProgress color="primary" />
  </Box>
);

const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;