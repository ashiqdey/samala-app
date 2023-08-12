import { useState, useEffect } from 'react';
// hooks
import useAuth from './useAuth';
import useApi from './useApi';
import useTransform from './useTransform';
import {
  transformOrder,
  //  transfromImage 
} from '../utils/formatString';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { updateOrder as updateAdminOrder } from '../redux/slices/order';
import {
  getOrders,
  // removeOrder,
  updateOrder as updateOrderRedux,
} from '../redux/slices/cart';

// -----------------------------------------------

const DEFAULT_ORDER = {
  "id": '',
  "status": '',
  "user_id": '',
  "items": '',
  "mrp_total": 0,
  "total": 0,
  "discount": 0,
  "delivery": 0,
  "phone": '',
  "address": '',
  "ts": null
}

const useOrder = (orderId) => {
  const { get, post } = useApi();
  const { config } = useAuth();
  const { transfromImage } = useTransform();

  const dispatch = useDispatch();
  const { orders, orderRefetch } = useSelector((state) => state.cart);

  const [order, setOrder] = useState({ ...DEFAULT_ORDER });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const refetch = orderRefetch || false;
      const res = await get({ key: 'getOrders', token: true, refetch });
      if (res.orders) {
        dispatch(getOrders({ orders: res.orders.map(transformOrder) }));
      }
    } catch (err) {
      console.warn("u/uo/47", err);
    }
  }


  const fetchOrder = async (refetch = false) => {
    try {
      const res = await get({ key: 'orderDetails', refetch, token: true, data: { order_id: orderId } });
      if (res.order && res.products) {
        const tempOrder = transformOrder(res.order);
        setOrder(tempOrder);

        // update the order in order list of admin
        dispatch(updateAdminOrder({ ...tempOrder }));

        // update the order in order list of app
        dispatch(updateOrderRedux({ ...tempOrder }));


        const products = res.products.map(e => ({
          ...e,
          bqty: parseInt(e.bqty, 10),
          bprice: parseFloat(e.bprice, 10),
          image: transfromImage(e.image, e.cdn, config),
        }));

        setProducts(products);
      }
    } catch (err) {
      console.warn("u/uo/79", err);
    }
  }



  const updateOrder = async (payload) => {
    setLoading(true);
    try {
      const res = await post({ key: 'orderUpdate', token: true, data: { order_id: orderId, ...payload } });

      if (res.status) {
        // update the status in order list
        dispatch(updateOrderRedux({ id: res.order_id, status: res.status }))
      }

      // refetch the order details
      fetchOrder(true);
    } catch (err) {
      console.warn("u/uo/98", err);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
    else {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);



  return {
    order,
    orders,
    products,
    updateOrder,
    loading
  }
}



export default useOrder;
