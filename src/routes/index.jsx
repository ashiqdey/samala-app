import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';

// components
import Loadable from '../components/micro/Loadable';
import { PATHS } from './paths';

// layouts
const AppLayout = Loadable(lazy(() => import('../layouts/AppLayout')));
const EmptyLayout = Loadable(lazy(() => import('../layouts/EmptyLayout')));

// -----------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    // protected routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard allowedRoles={2}>
            <AppLayout admin />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        // { element: <Navigate to={PATHS.dashboard.root} replace />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'orders', element: <Orders /> },
        { path: 'account', element: <Account admin /> },
        { path: 'search', element: <Search admin /> },
        {
          path: 'products',
          children: [
            { path: '', element: <Products defaultTab={0} /> },
            { path: 'add', element: <ProductAdd defaultTab={1} /> },
          ],
        },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard allowedRoles={2}>
            <EmptyLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        {
          path: 'products',
          children: [
            { path: 'edit/:productId', element: <ProductsEdit /> },
            { path: ':productName/:productId', element: <ProductDetails admin /> },
          ],
        },
        { path: 'featured', element: <ChangeFeatured /> },
        { path: 'orders/:orderId', element: <OrderDetailsAdmin /> },
      ],
    },

    {
      path: '',
      element: (
        <AuthGuard>
          <AppLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <AppPage /> },
        { path: 'account', element: <Account /> },
        {
          path: 'cart',
          children: [
            { path: '', element: <Cart defaultTab={0} /> },
            { path: 'wishlist', element: <Cart defaultTab={2} /> },
            { path: 'order', element: <Cart defaultTab={1} /> },
          ],
        },
      ],
    },

    {
      path: '',
      element: (
        <AuthGuard>
          <EmptyLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'search', element: <Search /> },
        { path: 'orders/:orderId', element: <OrderDetails /> },
        {
          path: 'products',
          children: [
            { element: <Navigate to={PATHS.root} replace />, index: true },
            { path: ':productName/:productId', element: <ProductDetails /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <EmptyLayout />,
      children: [{ path: '404', element: <NotFound /> }],
    },
    // {
    //   path: '/',
    //   element: <EmptyLayout />,
    //   children: [
    //     { element: <HomePage />, index: true },
    //     { path: 'unauthorized', element: <Unauthorized /> },
    //   ],
    // },

    // { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: <HomePage /> },
  ]);
}

// IMPORT COMPONENTS

// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// For un-authenticated user
const Login = Loadable(lazy(() => import('../pages/app/Login')));
const Unauthorized = Loadable(lazy(() => import('../pages/Unauthorized')));

const AppPage = Loadable(lazy(() => import('../pages/app')));
const Cart = Loadable(lazy(() => import('../pages/cart/cart')));
const OrderDetails = Loadable(lazy(() => import('../pages/app/order')));
const Account = Loadable(lazy(() => import('../pages/app/account')));
const Search = Loadable(lazy(() => import('../pages/search')));
const ProductDetails = Loadable(lazy(() => import('../pages/app/product-details')));

// For authenticated user
// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));
const Orders = Loadable(lazy(() => import('../pages/dashboard/orders')));
const Products = Loadable(lazy(() => import('../pages/dashboard/products')));
const ProductAdd = Loadable(lazy(() => import('../pages/dashboard/products-add')));
const ProductsEdit = Loadable(lazy(() => import('../pages/dashboard/products-edit')));
const ChangeFeatured = Loadable(lazy(() => import('../pages/dashboard/featured')));
const OrderDetailsAdmin = Loadable(lazy(() => import('../pages/dashboard/order-details')));
