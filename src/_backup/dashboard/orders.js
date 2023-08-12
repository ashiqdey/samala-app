import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// components
import Page from '../../components/micro/Page';
import Iconify from '../../components/micro/Iconify';
import OrderCardAdmin from '../../widgets/OrderCardAdmin';
import NoData from '../../components/micro/NoData';
import useAdminOrders from '../../hooks/useAdminOrders';
import { useSelector } from '../../redux/store';

// -----------------------------------------------

export default function AdminOrderPage() {
  const [tab, setTab] = useState(0);
  const { orders, porders, nextId, pnextId } = useSelector((state) => state.order);


  const handleChange = (_, newValue) => {
    setTab(newValue);
  };

  return (
    <Page title="Orders" color='paper'>
      <Stack direction='row' className='p-s t-0 zi-100 ai-c' sx={{ bgcolor: 'grey.100' }}>
        <Tabs value={tab} onChange={handleChange} className='w-100'>
          <Tab label="New orders" id='norder-tab' sx={{ px: 1, mr: '0!important', width: 'calc(50% - 26px)' }} />
          <Tab label="Completed" id='corder-tab' sx={{ px: 1, mr: '0!important', width: 'calc(50% - 26px)' }} />
          <Tab
            label={<></>}
            id='sync-tab'
            sx={{ mr: '0!important', width: 48, height: 48 }}
          />
        </Tabs>
      </Stack>

      <Container maxWidth='xl'>
        {
          tab === 0 ? <OrdersSection
            orders={orders}
            nextId={nextId}
            type='fresh'
          /> : <OrdersSection
            orders={porders}
            nextId={pnextId}
            type='processed'
          />
        }
      </Container>
    </Page>
  );
}


function OrdersSection({ orders, nextId, type }) {
  const { loading, fetchOrders } = useAdminOrders({ type });

  return (<>
    <IconButton
      onClick={() => fetchOrders('refresh')}
      size='large'
      sx={{ height: 48 }}
      className='p-f t-0 r-0 zi-100'
    >
      <Iconify icon='mdi:sync' className={loading ? 'rot-360' : ''} />
    </IconButton>

    {
      !loading && orders.length === 0 && <NoData text="Orders not found" />
    }
    <Stack spacing={2} className='py-2'>
      {
        orders.map(e => <OrderCardAdmin key={e.id} {...e} type={type} />)
      }
    </Stack>

    <Stack direction='row' className="py-5 jc-c">
      {loading && <CircularProgress />}
      {
        !loading && nextId > -1 && <Button variant='soft' onClick={() => fetchOrders()}>Load more</Button>
      }
    </Stack>
  </>)
}
OrdersSection.propTypes = {
  orders: PropTypes.array,
  nextId: PropTypes.number,
  type: PropTypes.string
};
