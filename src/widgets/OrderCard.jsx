import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
// @mui
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//
import { fDate } from '../utils/formatTime';
import { PATHS } from '../routes/paths';
import { ORDER_STATUS } from '../configs';
import { getStatusColor, getStatusVariant } from '../utils/order';
import OrderPriceCard from "./OrderPriceCard"


function Ordercard({ id, status, mrpTotal, total, discount, delivery, items, ts }) {
  // const { deleteOrder } = useCartPage(false);


  return (<Paper component={Link} to={`${PATHS.app.orderDetails}/${id}`} className='p-2 td-n'>
    <Stack direction='row' className='jc-sb ai-fs mb-2'>
      <Stack>
        <Typography variant="h5">
          #OSP0{id} &bull; ({items} items)
        </Typography>
        <Typography variant="subtitle2" color='text.secondary'>
          {fDate(parseInt(ts, 10))}
        </Typography>
      </Stack>


      <Chip
        label={ORDER_STATUS[status]}
        size='small'
        color={getStatusColor(status)}
        variant={getStatusVariant(status)}
      />
    </Stack>


    <OrderPriceCard
      mrpTotal={mrpTotal}
      delivery={delivery}
      discount={discount}
      total={total}
    />
  </Paper >)
}
Ordercard.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  items: PropTypes.string,
  mrpTotal: PropTypes.number,
  total: PropTypes.number,
  discount: PropTypes.number,
  delivery: PropTypes.number,
  ts: PropTypes.string,
};

export default Ordercard;
