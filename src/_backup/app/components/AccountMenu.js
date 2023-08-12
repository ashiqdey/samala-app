import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';

// components
import Iconify from '../../../components/micro/Iconify';
import { PATHS } from '../../../routes/paths';
import { config } from '../../../configs';
// hooks
import useAuth from '../../../hooks/useAuth';

// -----------------------------------------------

const adminItem = [
  {
    title: 'Admin dashboard',
    subtitle: 'Add, view and manage products',
    icon: 'mdi:shield-crown-outline',
    to: PATHS.dashboard.app,
    admin: false,
  },
  {
    title: 'App',
    subtitle: 'Back to app',
    icon: 'mdi:arrow-left',
    to: PATHS.app.root,
    admin: true,
  },
];



// -----------------------------------------------




export default function AccountMenu({
  admin,
  //  setUploadDialog
}) {
  const { user, logout } = useAuth();

  const items = [
    // {
    //   title: 'Order with prescription',
    //   subtitle: 'Upload & get medicines deliverd',
    //   icon: 'ic:outline-document-scanner',
    //   onClick: () => setUploadDialog(true)
    // },
    {
      title: 'Cart',
      subtitle: 'Manage your cart',
      icon: 'ic:outline-shopping-cart',
      to: PATHS.app.cart,
    },
    {
      title: 'Orders',
      subtitle: 'View your active orders',
      icon: 'mdi:moped-outline',
      to: PATHS.app.order,
    },
    {
      title: 'Wishlist',
      subtitle: 'View all your wishlisted items',
      icon: 'ic:baseline-favorite-border',
      to: PATHS.app.wishlist,
    },
  ];


  const items2 = [
    {
      title: 'Call us',
      subtitle: 'Call us for any query',
      icon: 'ic:outline-call',
      props: {
        href: `tel:+91${config.call}`,
        target: '_blank',
        rel: 'noopener',
      }
    },
    {
      title: 'WhatsApp us',
      subtitle: 'Write us your query on whatsapp',
      icon: 'ic:baseline-whatsapp',
      props: {
        href: `https://api.whatsapp.com/send?phone=+91${config.whatsapp}&text=Hi`,
        target: '_blank',
        rel: 'noopener',
      }
    },
    {
      title: 'Logout',
      subtitle: 'Logout from this app',
      icon: 'ic:baseline-logout',
      onClick: () => {
        logout();
      },
    },
  ];


  return (
    <Stack spacing={1}>
      {
        items.map(e => <MenuItems key={e.title} e={e} />)
      }

      <Divider sx={{ my: '16px !important' }} />

      {
        items2.map(e => <MenuItems key={e.title} e={e} />)
      }

      {user?.access > 1 && <MenuItems e={adminItem[admin ? 1 : 0]} sx={{
        bgcolor: 'info.main',
        mt: '32px!important',
        color: '#fff',
      }}
        iconSx={{
          bgcolor: '',
          color: '#fff',
          ml: 1,
          mr: -1
        }}
      />}

    </Stack>
  );
}

AccountMenu.propTypes = {
  admin: PropTypes.bool,
  // setUploadDialog: PropTypes.func,
};




const MenuItems = ({ e, sx, iconSx }) => (<ButtonBase sx={sx} className='d-block ta-l br-15 py-1'>
  <Stack
    // eslint-disable-next-line no-nested-ternary
    component={e.to ? Link : (e.onClick ? 'div' : 'a')}
    {...e.props}
    to={e?.to}
    onClick={e?.onClick}
    direction='row'
    className='ai-c td-n c-inherit'
    spacing={2}
  >
    <IconButton component='span' sx={{ color: 'grey.700', bgcolor: 'grey.100', opacity: '0.7', ...iconSx }} size='large'>
      <Iconify icon={e.icon} />
    </IconButton>
    <Stack>
      <Typography variant='font4'>{e.title}</Typography>
      <Typography variant='subtitle1' color='inherit' sx={{ opacity: 0.6 }}>{e.subtitle}</Typography>
    </Stack>
  </Stack>
</ButtonBase>)

MenuItems.propTypes = {
  e: PropTypes.object,
  sx: PropTypes.object,
  iconSx: PropTypes.object,
};