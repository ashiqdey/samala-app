import PropTypes from 'prop-types';
// import { Navigate } from "react-router-dom";
// @mui
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// hook
import useAuth from "../hooks/useAuth";

// -----------------------------------------------


RoleBasedGuard.propTypes = {
  allowedRoles: PropTypes.number,
  children: PropTypes.node
};



export default function RoleBasedGuard({ allowedRoles, children }) {

  const { user } = useAuth();
  const currentRole = user?.access || 1;



  if (allowedRoles >= currentRole) {
    return (
      <Container sx={{ pt: 5 }}>
        {/* {
          JSON.stringify({
            ar: allowedRoles.includes('*'),
            ai: allowedRoles.includes(currentRole)
          })
        } */}
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
