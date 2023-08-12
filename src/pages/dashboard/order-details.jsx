import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';

//  components
import Page from '../../components/micro/Page';
import OrderDetails from '../../widgets/OrderDetails';
import useOrder from '../../hooks/useOrder';
import Iconify from '../../components/micro/Iconify';

import { ORDER_STATUS } from '../../configs';
import { getStatusColor, getStatusVariant } from '../../utils/order';

// -----------------------------------------------

export default function OrderDetailsAdmin() {
  const { orderId } = useParams();

  const { order, products, loading, updateOrder } = useOrder(orderId);

  const [newDelivery, setDelivery] = useState(order?.delivery || 0);

  const onDeliveryChange = (e) => {
    if (e.target.value === '' || e.target.value.length > 4) {
      return setDelivery(0);
    }

    return setDelivery(parseInt(e.target.value, 10));
  };

  const acceptOrder = () => {
    updateOrder({ status: '2', delivery: newDelivery });
  };

  const generateText = () => {
    if (order.status === '2') {
      return `Your order having order number #OSP0${order.id} had been accepted and will be delivered soon.`;
    }
    if (order.status === '3') {
      return `Your order having order number #OSP0${order.id} is out for delivery please keep prescription handy.`;
    }
    if (order.status === '8') {
      return `Your order having order number #OSP0${order.id} had been cancelled.`;
    }
    if (order.status === '9') {
      return `Your order having order number #OSP0${order.id} had been delivered.`;
    }
  };

  const validatedPhone = () => {
    return order.phone.length === 10 ? `+91${order.phone}` : order.phone;
  };

  const shareOrderDetails = (type) => {
    const text = encodeURIComponent(generateText());
    const phone = validatedPhone();
    if (type === 'whatsapp') {
      // window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);
      window.open(`https://wa.me/${phone}/?text=${text}`);
    } else if (type === 'sms') {
      window.open(`sms:${phone}?body=${text}`);
    }
  };

  useEffect(() => {
    setDelivery(order.delivery);
  }, [order]);

  return (
    <Page title="Order details">
      <Container maxWidth="xl" className="pt-1">
        <OrderDetails order={order} products={products} delivery={newDelivery} admin>
          {order.status === '1' && (
            <Paper className="p-2">
              <Typography variant="h5" className="mb-2">
                Order acceptance
              </Typography>

              <TextField
                type="number"
                label="Delivery charge"
                value={newDelivery || ''}
                onChange={onDeliveryChange}
                fullWidth
                variant="filled"
              />

              <LoadingButton
                variant="contained"
                color="success"
                loading={loading}
                onClick={acceptOrder}
                className="mt-3"
                fullWidth
              >
                Accept order
              </LoadingButton>
            </Paper>
          )}

          {order.status !== '1' && (
            <Stack direction="row" className="jc-sb ai-c mb-2 mt-4">
              <Typography variant="h5">Order status</Typography>

              <Chip
                label={ORDER_STATUS[order.status]}
                size="small"
                color={getStatusColor(order.status)}
                variant={getStatusVariant(order.status)}
              />
            </Stack>
          )}

          {order.status !== '1' && order.status !== '8' && (
            <>
              <Stack direction="row" className="jc-sb fw-w">
                <StatusButton orderStatus={order.status} status="2" text="Accepted" updateOrder={updateOrder} />

                <StatusButton orderStatus={order.status} status="3" text="On Delivery" updateOrder={updateOrder} />

                <StatusButton orderStatus={order.status} status="9" text="Delivered" updateOrder={updateOrder} />
              </Stack>
            </>
          )}

          {order.status !== '1' && (
            <div className="bg-grey-100 p-2">
              <Typography variant="h5">Send message</Typography>
              <Typography variant="font5">{generateText()}</Typography>
              <Stack direction="row" className="mt-3" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="ic:baseline-whatsapp" />}
                  onClick={() => shareOrderDetails('whatapp')}
                  sx={{ bgcolor: '#19c6b2' }}
                  className="w-50"
                  href={`https://wa.me/${validatedPhone()}/?text=${encodeURIComponent(generateText())}`}
                  component="a"
                >
                  WhatsApp
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mdi:message-reply-text-outline" />}
                  onClick={() => shareOrderDetails('sms')}
                  className="w-50"
                  color="info"
                >
                  Text SMS
                </Button>
              </Stack>
            </div>
          )}

          {order.status !== '8' && order.status !== '9' && (
            <>
              <Divider className="my-5" />
              <Stack direction="row" className="jc-sb ai-c">
                <Typography variant="font5">Cancel order</Typography>
                <Button variant="soft" color="error" onClick={() => updateOrder({ status: '8' })}>
                  Cancel order
                </Button>
              </Stack>
            </>
          )}
        </OrderDetails>
      </Container>
    </Page>
  );
}

function StatusButton({ orderStatus, status, text, updateOrder }) {
  return (
    <Button
      onClick={() => updateOrder({ status })}
      variant={orderStatus === status ? 'contained' : 'outlined'}
      color={getStatusColor(status)}
    >
      {text}
    </Button>
  );
}
StatusButton.propTypes = {
  orderStatus: PropTypes.string,
  status: PropTypes.string,
  text: PropTypes.string,
  updateOrder: PropTypes.func,
};
