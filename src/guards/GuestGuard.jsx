import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATHS } from '../routes/paths';

// -----------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { auth } = useAuth();

  if (auth && auth.id) {
    return <Navigate to={PATHS.root} />;
  }

  return <>{children}</>;
}
