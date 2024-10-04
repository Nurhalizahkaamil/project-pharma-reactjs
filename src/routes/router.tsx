import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
const SignIn = lazy(() => import('pages/authentication/SignIn'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const Page404 = lazy(() => import('pages/errors/Page404'));
const Units = lazy(() => import('pages/master product/units/UnitsPages'));
const WelcomePage = lazy(() => import('pages/welcomPages/Pages.welcom')); // WelcomePage Import

import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import ProductsPages from 'pages/master product/products/ProductsPages';

export const routes = [
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.root, // Set as default '/'
        element: (
          <Suspense fallback={<PageLoader />}>
            <WelcomePage /> {/* Load WelcomePage as default */}
          </Suspense>
        ),
      },
      {
        path: rootPaths.dashboard,
        element: <Dashboard />,
      },      
      {
        path: rootPaths.units,
        element: (
          <MainLayout title="Units">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.units, // Using the correct path
            element: <Units />,
          },
        ],
      },
      {
        path: rootPaths.products,
        element: (
          <MainLayout title="Products">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.products, // Using the correct path
            element: <ProductsPages />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            path: paths.signin,
            element: <SignIn />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/inventory' });

export default router;
