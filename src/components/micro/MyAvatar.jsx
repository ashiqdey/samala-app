// hooks
import useAuth from '../../hooks/useAuth';
// utils
import createAvatar from '../../utils/createAvatar';
//
import Avatar from './Avatar';

// -----------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.dp}
      alt={user?.name}
      color={user?.dp ? 'default' : createAvatar(user?.name).color}
      {...other}
    >
      {createAvatar(user?.name).name}
    </Avatar>
  );
}
