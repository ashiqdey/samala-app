import { useParams } from 'react-router-dom';
// @mui
import Container from '@mui/material/Container';
//  6mponents
import Page from '../../components/micro/Page';
import OrderDetails from '../../widgets/OrderDetails';
import useOrder from '../../hooks/useOrder';

// -----------------------------------------------

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const { order, products, } = useOrder(orderId);

  return (
    <Page title="Order details">
      <Container maxWidth='xl' className='pt-1'>
        <OrderDetails
          order={order}
          products={products}
          delivery={order?.delivery || 0}
        />
      </Container>
    </Page>
  );
}
