import { createSlice } from '@reduxjs/toolkit';
// import omit from 'lodash/omit';
// utils
// import axios from '../../utils/axios';
//
// import { dispatch } from '../store';
import { concatArrayId } from '../../utils/arrayOps';


// ----------------------------------------------------------------------



const initialState = {
  cartIds: [], // array of id
  wishlistIds: [], // array of id

  carts: [], // array of products
  orders: [], // array of orders
  wishlists: [], // array of products

  cartNextId: null,
  wishlistNextId: null,

  orderRefetch: false,
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartIds(state, action) {
      const { cart, wishlist } = action.payload;

      // cart
      let temp = [...cart]
      temp.sort();
      state.cartIds = temp;

      // wishlist_ids
      temp = [...wishlist]
      temp.sort();
      state.wishlistIds = temp;
    },


    // add or remove single cart/wishlist id
    getCartId(state, action) {
      const { id, wishlist, add } = action.payload;
      const key = wishlist ? 'wishlistIds' : 'cartIds';

      if (add) {
        const temp = [...new Set([...state[key], id])];
        temp.sort();

        state[key] = temp;
      }
      else {
        state[key] = [...state[key]].filter(e => e !== id);
      }
    },


    // get all cart/wishlist items
    addCartItems(state, action) {
      const { products, wishlist, nextId } = action.payload;

      const keyNextId = wishlist ? 'wishlistNextId' : 'cartNextId';
      const key = wishlist ? 'wishlists' : 'carts';

      const tempProducts = addProducts(state[key], products);

      state[keyNextId] = nextId;
      state[key] = [...state[key], ...tempProducts];
    },


    // get all cart/wishlist items
    getOrders(state, action) {
      const { orders } = action.payload;
      state.orders = concatArrayId(state.orders, orders, -1);
      // no need to refetch order on next time
      state.orderRefetch = false;
    },




    updateOrder(state, action) {
      const order = action.payload;
      const orderId = order.id;

      // check if exists in orders
      const index = state.orders.findIndex(e => e.id === orderId);

      if (index > -1) {
        state.orders[index] = { ...state.orders[index], ...order };
      }
    },



    // add single cart/wishlist item
    addCartItem(state, action) {
      const { products, wishlist } = action.payload;

      const keyIds = wishlist ? 'wishlistIds' : 'cartIds';
      const key = wishlist ? 'wishlists' : 'carts';

      const tempProducts = addProducts(state[key], products);
      state[key] = [...state[key], ...tempProducts];

      const ids = products.map(e => e.id)
      const temp = [...new Set([...state[keyIds], ...ids])];
      temp.sort();
      state[keyIds] = temp;
    },



    // change qty of prdocucts in cart
    changeCartQty(state, action) {
      const { id, qty, revert } = action.payload;

      const products = [...state.carts].map(e => {
        if (e.id === id) {
          if (revert) {
            e.cartQty = e.oldCartQty;
          }
          else {
            // store old value for revert back
            e.oldCartQty = e.cartQty;

            e.cartQty = qty;
          }
        }

        return e;
      })
      state.carts = products;
    },




    // remove single cart/wishlist item
    removeCartItem(state, action) {
      const { id, wishlist } = action.payload;

      const keyIds = wishlist ? 'wishlistIds' : 'cartIds';
      const key = wishlist ? 'wishlists' : 'carts';

      state[keyIds] = [...state[keyIds]].filter(e => e !== id);
      state[key] = [...state[key]].filter(e => e.id !== id);
    },



    // remove single order
    removeOrder(state, action) {
      const { id } = action.payload;
      const temp = [...state.orders].filter(e => e.id !== id);
      state.orders = temp;
    },

    // clear cart afetr placing orderd
    clearCart(state) {
      state.cartIds = [];
      state.carts = [];
      state.orders = [];
      // refetch order next time
      state.orderRefetch = true;
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
  getCartIds,
  getCartId,

  addCartItems,
  addCartItem,

  removeCartItem,
  changeCartQty,
  clearCart,

  getOrders,
  removeOrder,
  updateOrder,
  refetchOrders,

} = slice.actions;



// app product to old array without duplicate
const addProducts = (oldArr, newArr) => {
  const ids = oldArr.map(e => e.id);
  const products = [];

  newArr.forEach(e => {
    if (!ids.includes(e.id)) {
      products.push(e)
    }
  });

  return products;
}