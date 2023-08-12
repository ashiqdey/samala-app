import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

//  6mponents
import PageHeading from '../components/micro/PageHeading';
import Iconify from '../components/micro/Iconify';

//
import OrderDetailsCard from './OrderDetailsCard';
import OrderPriceCard from './OrderPriceCard';
import OrderProductCard from './OrderProductCard';

function OrderDetails({ order, admin, products, delivery, children }) {
  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row" className="p-s zi-100 t-0 bf-blur5">
        <IconButton onClick={() => navigate(-1)} size="large" edge="start">
          <Iconify icon="mdi:arrow-left" />
        </IconButton>

        <PageHeading title="Order details" />
      </Stack>

      <Stack spacing={4} className="pt-2">
        <OrderDetailsCard {...order} admin={admin} />

        <Box>
          <Typography variant="h5" color="text.secondary" className="mb-1">
            Products ({products.length})
          </Typography>
          <Stack spacing={2}>
            {products.map((e) => (
              <OrderProductCard key={e.id} {...e} admin={admin} />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5" color="text.secondary" className="mb-1">
            Payment summary
          </Typography>
          <Paper className="p-2">
            <OrderPriceCard
              mrpTotal={order.mrpTotal}
              delivery={delivery}
              discount={order.discount}
              total={order.total}
            />
          </Paper>
        </Box>

        {children}
      </Stack>
    </>
  );
}
OrderDetails.propTypes = {
  admin: PropTypes.bool,
  order: PropTypes.object,
  products: PropTypes.array,
  delivery: PropTypes.number,
  children: PropTypes.node,
};
export default OrderDetails;
