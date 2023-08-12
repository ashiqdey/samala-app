import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
//
import NavigationDock from '../components/navbar';
// import UploadPrescription from '../dialogs/UploadPrescription';

// -----------------------------------------------

export default function AppLayout({ admin }) {
  return (
    <>
      <Box className='app-wrapper' sx={{ pb: 10, }}>
        <Outlet />
      </Box>

      <NavigationDock admin={admin} />

      {/* {
        !admin && <UploadPrescription />
      } */}
    </>
  );
}
AppLayout.propTypes = {
  admin: PropTypes.bool,
};