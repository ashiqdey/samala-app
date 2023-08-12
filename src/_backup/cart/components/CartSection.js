import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// @mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';


import CircularProgress from '@mui/material/CircularProgress';
// hooks
import useCartPage from '../../../hooks/useCartPage';
import useApi from '../../../hooks/useApi';
//
import Image from '../../../components/micro/Image';
import Iconify from '../../../components/micro/Iconify';
import AddressDialog from '../../../dialogs/AddressDialog';
import CartProductCard from '../../../widgets/CartProductCard';
import { fCurrency } from '../../../utils/formatNumber';
import { PATHS } from '../../../routes/paths';


export default function Cart() {
  const navigate = useNavigate();
  const { carts, fetchCart, onClearCart, cartNextId, loading } = useCartPage(false);
  const { enqueueSnackbar } = useSnackbar();
  const [ploading, setPloading] = useState(false);
  const { post } = useApi();

  const [data, setData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const summary = useMemo(() => {
    const DISCOUNT = 0;
    const DELIVERY = 0;

    const temp = {
      mrp: 0,
      discount: 0,
      delivery: DELIVERY,
      total: 0,
    }

    const [
      mrp,
      sprice
    ] = carts.reduce((a, e) => [(a[0] + (e.mrp * e.cartQty)), (a[1] + (e.sprice * e.cartQty))], [0, 0]);

    temp.mrp = mrp;
    temp.total = sprice + DELIVERY - DISCOUNT;
    temp.discount = temp.mrp - temp.total;

    return temp;
  }, [carts]);


  const onPlaceOrder = async () => {
    // data
    if (data.phone.length === 0 && data.address.length === 0) {
      enqueueSnackbar('Add your delivery address', { variant: 'error' });
      return;
    }
    if (data.phone.length === 0) {
      enqueueSnackbar('Add a valid phone number', { variant: 'error' });
      return;
    }
    if (data.address.length === 0) {
      enqueueSnackbar('Add your address', { variant: 'error' });
      return;
    }

    try {
      setPloading(true);

      const payload = {
        ...data,
        discount: summary.discount,
        delivery: summary.delivery,
      };

      const response = await post({ key: 'placeOrder', token: true, data: payload });
      setPloading(false);
      if (response.order_id) {
        enqueueSnackbar('Order placed', { variant: 'success' });
        onClearCart();
        navigate(PATHS.app.order);
      }
    } catch (error) {
      console.warn("h/p/a/c/cs/82", error);
    }
  }


  if (carts.length === 0) {
    return (<Grid container spacing={2}>
      <Stack className="ai-c jc-c w-100 dark-brightness-07" sx={{ height: 'calc(100vh - 180px)', ml: 2 }}>
        <Image src='/assets/samala/images/cart.webp' sx={{ width: 180, }} />
        <Typography variant="font4">
          Your cart is empty
        </Typography>
      </Stack>
    </Grid>)
  }

  return (<Stack>
    <Stack spacing={2}>
      {
        carts.map(e => <CartProductCard key={e.id} {...e} />)
      }
    </Stack>

    <Stack direction='row' className="pt-3 pb-6 jc-c w-100">
      {loading && <CircularProgress />}
      {
        !loading && cartNextId !== -1 && <Button onClick={fetchCart} variant='text'>Load more</Button>
      }
    </Stack>

    {
      !loading && carts.length && <>
        <Summary summary={summary} />
        <Alert className='mt-2' severity="warning">Delivery charge might change during order approval.</Alert>

        <Address
          data={data}
          setData={setData}
        />

        <Stack direction='row' className="jc-c w-100">
          {
            ploading ? <CircularProgress /> : <Button
              variant='contained'
              className='w-100 mt-5'
              size='large'
              onClick={onPlaceOrder}
            >
              Place order
            </Button>
          }
        </Stack>
      </>
    }

  </Stack>)
}






function Address({ data, setData }) {
  const [addressModal, setAddressModal] = useState(false);

  return (<>
    <Paper className='p-2 mt-2'>
      <Typography variant="h5">
        Payment
      </Typography>
      <FormControlLabel value="cod" control={<Radio checked />} label="Cash on Delivery" />
    </Paper>


    <Paper className='p-2 mt-2'>
      <Stack direction='row' className='jc-sb ai-c'>
        <Typography variant="h5">
          Address dsd
        </Typography>
        <Button
          size='small'
          variant='text'
          onClick={() => setAddressModal(true)}
          startIcon={<Iconify icon={data.phone.length < 10 || data.address.length === 0 ? 'mdi:plus' : 'mdi:pencil'} width={16} height={16} />}
        >
          {data.phone.length < 10 || data.address.length === 0 ? "Add address" : "Edit address"}
        </Button>
      </Stack>

      {
        data.phone.length > 0 && data.address.length > 0 && <Box className="mt-2">
          <Stack className='mb-15'>
            <Typography variant="font5" color='text.secondary'>
              Name
            </Typography>
            <Typography variant="font4" color='text.primary'>
              {data.name}
            </Typography>
          </Stack>

          <Stack className='mb-15'>
            <Typography variant="font5" color='text.secondary'>
              Phone number
            </Typography>
            <Typography variant="font4" color='text.primary'>
              {data.phone}
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="font5" color='text.secondary'>
              Address
            </Typography>
            <Typography variant="font4" color='text.primary'>
              {data.address}
            </Typography>
          </Stack>
        </Box>
      }
    </Paper>


    <Box className='mt-2'>
      <FormControlLabel control={<Checkbox checked />} label="I have the required prescription." />
      <Typography variant="subtitle2" color='text.secondary'>
        There are certain medicine that requires doctor's prescription, If requried so, it will be checked during delivery. Make sure to keep it handy while receiving the delivery.
      </Typography>
    </Box>


    <AddressDialog
      open={addressModal}
      onClose={() => setAddressModal(false)}
      onConfirm={setData}
      data={data}
    />
  </>)
}
Address.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
};





function Summary({ summary }) {
  return (<Paper className='p-2'>
    <Typography variant="h5" className='ta-c mb-2'>
      Summary
    </Typography>

    <Stack direction='row' className='jc-sb ai-c'>
      <Typography variant="font5" color='text.secondary'>
        Sub total
      </Typography>
      <Typography variant="font4" color='text.primary'>
        {fCurrency(summary.mrp)}
      </Typography>
    </Stack>
    <Stack direction='row' className='jc-sb ai-c'>
      <Typography variant="font5" color='text.secondary'>
        Delivery charge
      </Typography>
      <Typography variant="font4" color='text.primary'>
        {summary.delivery}
      </Typography>
    </Stack>
    <Stack direction='row' className='jc-sb ai-c'>
      <Typography variant="font5" color='success.main'>
        Discount
      </Typography>
      <Typography variant="font4" color='success.dark'>
        (-) {fCurrency(summary.discount)}
      </Typography>
    </Stack>

    <Divider className='my-2' />

    <Stack direction='row' className='jc-sb ai-c'>
      <Typography variant="h5" color='text.primary'>
        Total
      </Typography>
      <Typography variant="h4" color='text.primary'>
        ₹{fCurrency(summary.total)}
      </Typography>
    </Stack>
  </Paper>)
}
Summary.propTypes = {
  summary: PropTypes.object,
};