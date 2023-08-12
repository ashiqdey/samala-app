/* eslint-disable no-lonely-if */
import { createSlice } from '@reduxjs/toolkit';
import { concatArrayId } from '../../utils/arrayOps';

// ----------------------------------------------------------------------


const initialState = {
  orders: [], // array of orders
  nextId: null,

  // processed
  porders: [], // array of orders
  pnextId: null,
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    saveOrders(state, action) {
      const { orders, nextId, type } = action.payload;

      const orderKey = (type && type === "processed") ? "porders" : "orders";
      const idKey = (type && type === "processed") ? "pnextId" : "nextId";

      // sort desc
      state[orderKey] = concatArrayId(state[orderKey], orders, -1);
      state[idKey] = nextId;
    },


    updateOrder(state, action) {
      const order = action.payload;
      const orderId = order.id;

      // check if exists in orders, porders
      const index = state.orders.findIndex(e => e.id === orderId);
      const pindex = state.porders.findIndex(e => e.id === orderId);

      if (order.status === '8' || order.status === '9') {
        // move from order to porders
        if (index > -1) {
          const moveOrder = { ...state.orders[index], ...order };
          state.porders = concatArrayId(state.porders, [{ ...moveOrder }], -1);

          // remove from orders
          state.orders = state.orders.filter(e => e.id !== orderId);
        }
        else if (pindex > -1) {
          // change values
          state.porders[index] = { ...state.porders[index], ...order };
        }
      }
      else {
        // move from porders to order
        if (pindex > -1) {
          const moveOrder = { ...state.porders[index], ...order };
          state.orders = concatArrayId(state.orders, [{ ...moveOrder }], -1);

          // remove from porders
          state.porders = state.porders.filter(e => e.id !== orderId);
        }
        // change values
        else if (index > -1) {
          state.orders[index] = { ...state.orders[index], ...order };
        }
      }
    },

  },
});

// Reducer
export default slice.reducer;

// export const {
//   actions,
//   startLoading,
//   getProductsSuccess
// } = slice;

// Actions
export const {
  saveOrders,
  updateOrder,
} = slice.actions;



