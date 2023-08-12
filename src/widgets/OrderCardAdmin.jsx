import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @mui
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

//
import { fDateTime } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';
import { getStatusColor, getStatusVariant, getTotal } from '../utils/order';
import { ORDER_STATUS } from '../configs';
import { PATHS } from '../routes/paths';

function OrderCardAdmin({ id, status, mrpTotal, total, discount, delivery, items, address, ts, type }) {
  return (
    <Paper component={Link} to={`${PATHS.dashboard.orders}/${id}`} className="p-2 td-n">
      <Stack direction="row" className="jc-sb ai-c w-100">
        <Typography variant="h5">
          #OSP0{id} &bull; ({items} items)
        </Typography>
        <Chip
          label={ORDER_STATUS[status]}
          size="small"
          color={getStatusColor(status)}
          variant={getStatusVariant(status)}
        />
      </Stack>

      <Typography variant="subtitle2" color="text.secondary">
        {fDateTime(parseInt(ts, 10))}
      </Typography>

      {type === 'fresh' && (
        <Stack className="mb-2 mt-2">
          <Typography variant="font5" color="text.secondary">
            Address :
          </Typography>
          <Typography variant="font5" color="text.primary" className="ws-pl">
            {address.replace(/\\n/g, '\n')}
          </Typography>
        </Stack>
      )}

      <Divider className="my-2" />

      <Stack direction="row" className="jc-sb ai-c">
        <Typography variant="h5" color="text.primary">
          Total
        </Typography>
        <Typography variant="h4" color="text.primary">
          ₹{fCurrency(getTotal(mrpTotal, delivery, discount))}
        </Typography>
      </Stack>
    </Paper>
  );
}
OrderCardAdmin.propTypes = {
  id: PropTypes.string,
  items: PropTypes.string,
  mrpTotal: PropTypes.number,
  total: PropTypes.number,
  discount: PropTypes.number,
  delivery: PropTypes.number,
  status: PropTypes.string,
  ts: PropTypes.string,
  address: PropTypes.string,
  type: PropTypes.string,
};

export default OrderCardAdmin;
