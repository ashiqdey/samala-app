import { Outlet } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
//

// -----------------------------------------------

export default function DashboardLayout() {
  return (
    <Box className='app-wrapper' sx={{ pb: 2, }}>
      <Outlet />
    </Box>
  );
}
