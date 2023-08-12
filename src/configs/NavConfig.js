// routes
import { PATHS } from '../routes/paths';


export const appItems = [
  {
    to: PATHS.app.root,
    icon: 'duo-grid.svg'
  },
  {
    to: PATHS.app.cart,
    icon: 'duo-cart.svg'
  },
  {
    to: PATHS.app.account,
    icon: 'duo-4-dot.svg'
  }
];


export const adminItems = [
  {
    to: PATHS.dashboard.app,
    icon: 'duo-grid.svg'
  },
  {
    to: PATHS.dashboard.search,
    icon: 'duo-medicine.svg'
  },
  {
    to: PATHS.dashboard.addProducts,
    icon: 'duo-add.svg'
  },
  {
    to: PATHS.dashboard.orders,
    icon: 'duo-cart.svg'
  },
  {
    to: PATHS.dashboard.account,
    icon: 'duo-4-dot.svg'
  }
];
