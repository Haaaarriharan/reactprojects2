import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const PasswordRecovery = Loadable(
  lazy(() => import('./pages/authentication/PasswordRecovery'))
);
const PasswordReset = Loadable(
  lazy(() => import('./pages/authentication/PasswordReset'))
);
const Register = Loadable(
  lazy(() => import('./pages/authentication/Register'))
);
const VerifyCode = Loadable(
  lazy(() => import('./pages/authentication/VerifyCode'))
);

// Dashboard pages

const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const Analytics = Loadable(lazy(() => import('./pages/dashboard/Analytics')));
const Calendar = Loadable(lazy(() => import('./pages/dashboard/Calendar')));
const MenuCreate = Loadable(lazy(() => import('./pages/dashboard/MenuCreate')));
const CustomerDetails = Loadable(
  lazy(() => import('./pages/dashboard/CustomerDetails'))
);
const CustomerEdit = Loadable(
  lazy(() => import('./pages/dashboard/CustomerEdit'))
);
const CustomerList = Loadable(
  lazy(() => import('./pages/dashboard/CustomerList'))
);
const UserList = Loadable(
  lazy(() => import('./pages/dashboard/User'))
);
const UserDetails = Loadable(
  lazy(() => import('./pages/dashboard/UserDetails'))
);
const UserCreateForm = Loadable(
  lazy(() => import('./pages/dashboard/UserCreate'))
);
const UserEditForm = Loadable(
  lazy(() => import('./pages/dashboard/UserEdit'))
);
const MenuList = Loadable(
  lazy(() => import('./pages/dashboard/Menu'))
);
const MenuEdit = Loadable(
  lazy(() => import('./pages/dashboard/MenuEdit'))
);
const MenuDetails = Loadable(
  lazy(() => import('./pages/dashboard/MenuDetails'))
);
const DeliveryVansList = Loadable(
  lazy(() => import('./pages/dashboard/DeliveryVans'))
);
const DeliveryVansCreate = Loadable(
  lazy(() => import('./pages/dashboard/DeliveryVansCreate'))
);
const DeliveryVansDetails = Loadable(
  lazy(() => import('./pages/dashboard/DeliveryVansDetails'))
);
const DeliveryVansEdit = Loadable(
  lazy(() => import('./pages/dashboard/DeliveryVansEdit'))
);
const Finance = Loadable(lazy(() => import('./pages/dashboard/Finance')));
const InvoiceDetails = Loadable(
  lazy(() => import('./pages/dashboard/InvoiceDetails'))
);
const InvoiceList = Loadable(
  lazy(() => import('./pages/dashboard/InvoiceList'))
);
const OrderDetails = Loadable(
  lazy(() => import('./pages/dashboard/OrderDetails'))
);
const OrderList = Loadable(lazy(() => import('./pages/dashboard/OrderList')));
const ProductCreate = Loadable(
  lazy(() => import('./pages/dashboard/ProductCreate'))
);
const ProductList = Loadable(
  lazy(() => import('./pages/dashboard/ProductList'))
);

// Error pages

const AuthorizationRequired = Loadable(
  lazy(() => import('./pages/AuthorizationRequired'))
);
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'login-unguarded',
        element: <Login />,
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />,
      },
      {
        path: 'password-reset',
        element: <PasswordReset />,
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      {
        path: 'register-unguarded',
        element: <Register />,
      },
      {
        path: 'verify-code',
        element: <VerifyCode />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        element: <Analytics />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'customers',
        children: [
          {
            element: <CustomerList />,
          },
          {
            path: ':customerId',
            element: <CustomerDetails />,
          },
          {
            path: ':customerId/edit',
            element: <CustomerEdit />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            element: <UserList />,
          },
          {
            path: ':userId',
            element: <UserDetails />,
          }, 
          {
            path: 'new',
            element: <UserCreateForm />,
          },
          {
            path: ':userId/edit',
            element: <UserEditForm />,
          },
        ],
      },      
      {
        path: 'menu',
        children: [
          {
            element: <MenuList />,
          },
          {
            path: ':menuId',
            element: <MenuDetails />,
          },
          {
            path: ':menuId/edit',
            element: <MenuEdit />,
          },
          {
            path: 'new',
            element: <MenuCreate />
          }
        ],
      },
      {
        path: 'delivery-vans',
        children: [
          {
            element: <DeliveryVansList />,
          },
          {
            path: 'new',
            element: <DeliveryVansCreate />
          },
          {
            path: ':deliveryvansId',
            element: <DeliveryVansDetails />,
          },
          {
            path: ':deliveryvansId/edit',
            element: <DeliveryVansEdit />,
          },          
        ],
      },      
      {
        path: 'invoices',
        children: [
          {
            path: 'all',
            element: <InvoiceList />,
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetails />,
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            element: <OrderList />,
          },
          {
            path: ':orderId',
            element: <OrderDetails />,
          },
        ],
      },
      {
        path: 'finance',
        element: <Finance />,
      },
      {
        path: 'products',
        children: [
          {
            element: <ProductList />,
          },
          {
            path: 'new',
            element: <ProductCreate />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '*',
    element: <MainLayout />,
    children: [
      {
        path: '401',
        element: <AuthorizationRequired />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '500',
        element: <ServerError />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
