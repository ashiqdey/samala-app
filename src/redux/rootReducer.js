import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
// import mailReducer from './slices/mail';
import keyvalueReducer from './slices/keyvalue';
import productsReducer from './slices/products';
import apiReducer from './slices/api';
import cartReducer from './slices/cart';
import orderReducer from './slices/order';

// -----------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

// const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
// };

const rootReducer = combineReducers({
  // mail: mailReducer,
  keyvalue: keyvalueReducer,
  products: productsReducer,
  api: apiReducer,
  cart: cartReducer,
  order: orderReducer,

  // kanban: kanbanReducer,
  // product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
