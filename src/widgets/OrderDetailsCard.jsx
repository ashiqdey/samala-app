import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

// hooks
// import useCartPage from '../hooks/useCartPage';
//
import Iconify from '../components/micro/Iconify';
import { fDateTime } from '../utils/formatTime';
import { ORDER_STATUS } from '../configs';
import { getStatusColor, getStatusVariant } from '../utils/order';

function OrderDetailsCard({ admin, id, status, name, phone, address, ts }) {
  // const { deleteOrder } = useCartPage(false);

  const linkAddress = () => {
    // const curLoc = '26.1463896,90.6298934';
    const curLoc = '';
    const t = address.replace(/\s/g, '+').replace(/\\n/g, '+');
    return `https://www.google.com/maps/dir/${curLoc}/${t}`;
  };

  return (
    <Box>
      <Paper className="p-2">
        <Stack direction="row" className="jc-sb ai-c">
          <Stack>
            <Typography variant="h5">#OSP0{id}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {fDateTime(parseInt(ts, 10))}
            </Typography>
          </Stack>

          <Chip
            label={ORDER_STATUS[status]}
            size="small"
            color={getStatusColor(status)}
            variant={getStatusVariant(status)}
          />
        </Stack>
      </Paper>

      <Paper className="p-2 mt-2">
        {name && (
          <Stack>
            <Typography variant="font4" color="text.primary">
              {name}
            </Typography>
          </Stack>
        )}

        <Stack
          component={admin ? 'a' : 'div'}
          href={`tel:+91${phone}`}
          direction="row"
          className="mb-2 jc-sb ai-c mb-2 td-n "
        >
          <Stack>
            <Typography variant="font4" color="text.primary">
              {phone}
            </Typography>
          </Stack>

          {admin && (
            <IconButton edge="end">
              <Iconify icon="ic:outline-call" />
            </IconButton>
          )}
        </Stack>

        <Stack
          component={admin ? 'a' : 'div'}
          href={linkAddress()}
          target="_blank"
          direction="row"
          className="mb-2 td-n jc-sb ai-c mb-2"
        >
          <Stack>
            <Typography variant="font5" color="text.secondary">
              Address :
            </Typography>
            <Typography variant="font5" color="text.primary" className="ws-pl">
              {address.replace(/\\n/g, '\n')}
            </Typography>
          </Stack>

          {admin && (
            <IconButton edge="end">
              <Iconify icon="mdi:map-marker-outline" />
            </IconButton>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
OrderDetailsCard.propTypes = {
  admin: PropTypes.bool,
  id: PropTypes.string,
  status: PropTypes.string,
  ts: PropTypes.string,
  phone: PropTypes.string,
  name: PropTypes.name,
  address: PropTypes.string,
};
export default OrderDetailsCard;
