
const urls = {
  authenticate: '/auth/authenticate',
  getToken: '/auth/generate-token',
  logout: '/auth/logout',

  category: '/products/category-get',
  products: '/products/products-get',
  featured: '/products/featured-get',
  addFeatured: '/products/featured-add',
  removeFeatured: '/products/featured-remove',



  similar: '/products/similar',
  addSimilar: '/products/similar-add',
  removeSimilar: '/products/similar-remove',


  suggestion: '/products/search-suggestion',
  search: '/products/search',
  productsDetails: '/products/details',

  cart: '/cart/index',
  getCart: '/cart/get-cart',
  cartAdd: '/cart/add',
  cartRemove: '/cart/remove',
  changeQty: '/cart/change-qty',

  getOrders: '/cart/get-orders',
  placeOrder: '/cart/place-order',
  deleteOrder: '/cart/delete-order',
  adminOrders: '/cart/get-admin-orders',
  orderDetails: '/cart/order-details',
  orderUpdate: '/cart/order-update',

  imageUpload: '/images/upload',
  productAdd: '/products/add',
  productUpdate: '/products/update',
  productDelete: '/products/delete',
  imageUpdate: '/products/update-images',

};

export default urls;