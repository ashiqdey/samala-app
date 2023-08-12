// import PropTypes from 'prop-types';
// import { useState, useMemo } from 'react';
// import { useSnackbar } from 'notistack';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// hooks
import useOrder from '../../../hooks/useOrder';
//
import Image from '../../../components/micro/Image';
import Ordercard from '../../../widgets/OrderCard';


export default function Cart() {
  const { orders } = useOrder();


  if (orders.length === 0) {
    return (<Grid container spacing={2}>
      <Stack className="ai-c jc-c w-100 dark-brightness-07" sx={{ height: 'calc(100vh - 180px)', ml: 2 }}>
        <Image src='/assets/samala/images/order.webp' sx={{ width: 180, }} />
        <Typography variant="font4">
          No orders found
        </Typography>
      </Stack>
    </Grid>)
  }

  return (<Stack>
    <Stack spacing={2}>
      {
        orders.map(e => <Ordercard key={e.id} {...e} />)
      }
    </Stack>
  </Stack>)
}



