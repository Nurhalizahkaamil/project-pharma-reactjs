import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import Dashboard from 'pages/admingudang/dashboard/Dashboard';
import WarehousePage from 'pages/admingudang/master inventory/warehouse/WarehousePage'
import InventoriesPage from 'pages/admingudang/master inventory/inventory/InventoriesPages';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
// const Dashboard = lazy(() => import('pages/dashboard/Dashboard'));
const SignIn = lazy(() => import('pages/authentication/SignIn'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const Page404 = lazy(() => import('pages/errors/Page404'));
const Units = lazy(() => import('pages/admingudang/master product/units/UnitsPages')); // Periksa path
const WelcomePage = lazy(() => import('pages/welcomPages/Pages.welcome')); // Periksa path
const ProductsPages = lazy(() => import('pages/admingudang/master product/products/ProductsPages')); // Periksa path
const CategoriesPage = lazy(() => import('pages/admingudang/master product/categories/CategoriesPages')); // Periksa path

export const routes = [
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.root,
        element: (
          <Suspense fallback={<PageLoader />}>
            <WelcomePage />
          </Suspense>
        ),
      },
      {
        path: rootPaths.dashboard,
        element: (
          <MainLayout title="Dashboard">
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          </MainLayout>
        ),
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
            path: paths.units,
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
            path: paths.products,
            element: <ProductsPages />,
          },
        ],
      },
      {
        path: rootPaths.categories,
        element: (
          <MainLayout title="Categories">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.categories,
            element: <CategoriesPage />,
          },
        ],
      },
      {
        path: rootPaths.warehouse,
        element: (
          <MainLayout title="Warehouse">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.warehouse,
            element: <WarehousePage />,
          },
        ],
      },
      {
        path: rootPaths.inventories,
        element: (
          <MainLayout title="Inventories">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.inventories,
            element: <InventoriesPage />,
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
