import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
//  6mponents
import Page from '../../components/micro/Page';
//
import Cart from './components/CartSection';
import Orders from './components/OrdersSection';
import Wishlist from './components/WishlistSection';
import { PATHS } from '../../routes/paths';

// -----------------------------------------------

export default function CartPage({ defaultTab }) {
  const [tab, setTab] = useState(defaultTab);
  const navigate = useNavigate();

  const handleChange = (_, newValue) => {
    setTab(newValue);
    const links = ['cart', 'order', 'wishlist'];
    navigate(PATHS.app[links[newValue]]);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith(PATHS.app.order)) {
      setTab(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Page title={tab === 0 ? 'Cart' : 'Wishlist'} color="paper">
      <Box className="p-s t-0 zi-100" sx={{ bgcolor: 'grey.100' }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Cart" id="cart-tab" sx={{ width: 'calc(33.33% - 6px)' }} />
          <Tab label="Orders" id="Orders-tab" sx={{ width: 'calc(33.33% - 6px)' }} />
          <Tab label="Wishlist" id="wishlist-tab" sx={{ width: 'calc(33.33% - 6px)' }} />
        </Tabs>
      </Box>
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        {tab === 0 && <Cart />}
        {tab === 1 && <Orders />}
        {tab === 2 && <Wishlist />}
      </Container>
    </Page>
  );
}

CartPage.propTypes = {
  defaultTab: PropTypes.number,
};
