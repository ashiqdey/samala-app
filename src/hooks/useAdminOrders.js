/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from '../redux/store';
import {
  saveOrders
} from '../redux/slices/order';
// utils
import useApi from './useApi';
import { transformOrder } from '../utils/formatString';

// -----------------------------------------------


const useAdminOrder = ({ type }) => {
  const { orders, porders, nextId, pnextId } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { get } = useApi();

  const [loading, setLoading] = useState(false);

  const fetchOrders = async (fetchType) => {
    try {
      setLoading(true);
      const data = {
        type,
      };

      if (fetchType !== 'refresh') {
        data.next_id = type === "processed" ? pnextId : nextId;
      }

      const res = await get({ key: 'adminOrders', cache: false, token: true, data });
      dispatch(saveOrders({
        orders: res.orders.map(transformOrder),
        nextId: res.next_id,
        type: res.type,
      }));
    } catch (error) {
      console.warn("h/ucp/31", error);
    }
    finally {
      setLoading(false);
    }
  }




  useEffect(() => {
    if ((type === 'fresh' && nextId === null || (type === 'processed' && pnextId === null))) {
      fetchOrders();
    }
  }, [type])


  return {
    orders,
    porders,
    loading,
    fetchOrders,
    nextId,
    pnextId
  }
}



export default useAdminOrder;
