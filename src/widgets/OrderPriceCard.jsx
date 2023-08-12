import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
//
import { fCurrency } from '../utils/formatNumber';
import { getTotal } from '../utils/order';

function OrderPriceCard({ mrpTotal, delivery, discount, total }) {
  return (
    <>
      <Stack direction="row" className="jc-sb ai-c">
        <Typography variant="font5" color="text.secondary">
          Sub total
        </Typography>
        <Typography variant="font4" color="text.primary">
          {fCurrency(mrpTotal)}
        </Typography>
      </Stack>
      <Stack direction="row" className="jc-sb ai-c">
        <Typography variant="font5" color="text.secondary">
          Delivery charge
        </Typography>
        <Typography variant="font5" color="text.primary">
          {delivery}
        </Typography>
      </Stack>
      <Stack direction="row" className="jc-sb ai-c">
        <Typography variant="font5" color="success.main">
          Discount
        </Typography>
        <Typography variant="font4" color="success.dark">
          (-) {fCurrency(discount)}
        </Typography>
      </Stack>

      <Divider className="my-2" />

      <Stack direction="row" className="jc-sb ai-c">
        <Typography variant="h5" color="text.primary">
          Total
        </Typography>
        <Typography variant="h4" color="text.primary">
          ₹{fCurrency(getTotal(mrpTotal, delivery, discount))}
        </Typography>
      </Stack>
    </>
  );
}
OrderPriceCard.propTypes = {
  mrpTotal: PropTypes.number,
  delivery: PropTypes.number,
  discount: PropTypes.number,
  total: PropTypes.number,
};

export default OrderPriceCard;
