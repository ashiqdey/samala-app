
function path(root, sublink = '') {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_APP = '';
const ROOTS_TEST = '/tests';


// -----------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};


export const PATHS = {
  root: ROOTS_APP,

  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500',

  login: path('/auth/login'),
  app: {
    root: path('/'),
    cart: path(ROOTS_APP, '/cart'),
    order: path(ROOTS_APP, '/cart/order'),
    orderDetails: path(ROOTS_APP, '/orders'),
    wishlist: path(ROOTS_APP, '/cart/wishlist'),
    account: path(ROOTS_APP, '/account'),
    products: path(ROOTS_APP, '/products'),
    search: path(ROOTS_APP, '/search'),
  },
  dashboard: {
    root: path(ROOTS_DASHBOARD),
    app: path(ROOTS_DASHBOARD, '/app'),
    search: path(ROOTS_DASHBOARD, '/search'),
    products: path(ROOTS_DASHBOARD, '/products'),
    addProducts: path(ROOTS_DASHBOARD, '/products/add'),
    editProducts: path(ROOTS_DASHBOARD, '/products/edit'),
    orders: path(ROOTS_DASHBOARD, '/orders'),
    featured: path(ROOTS_DASHBOARD, '/featured'),
    account: path(ROOTS_DASHBOARD, '/account'),
  },


  test: {
    root: ROOTS_TEST,
    components: path(ROOTS_TEST, '/components'),
    allComponents: path(ROOTS_TEST, '/all-components'),
    pages: path(ROOTS_TEST, '/pages'),
  }
};

export const PATH_DOCS = '';
