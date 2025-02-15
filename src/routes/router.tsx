import { Children, SetStateAction, Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import PageLoader from 'components/loading/PageLoader';
import Progress from 'components/loading/Progress';
import Dashboard from 'pages/dashboard/Dashboard';
import WarehousePage from 'pages/admingudang/master product/warehouse/WarehousePage';
import InventoriesPage from 'pages/admingudang/master inventory/inventory/InventoriesPages';
import CategoriesFormPage from 'pages/admingudang/master product/categories/FormCreate';
import UpdateCategoryForm from 'pages/admingudang/master product/categories/UpdateCategories';
import UnitsFormPage from 'pages/admingudang/master product/units/FormUnits';
import UpdateUnitsForm from 'pages/admingudang/master product/units/UpdateUnits';
import SupplierFormPage from 'pages/admingudang/master data/suppliers/FormSupplier';
import UpdateSupplierForm from 'pages/admingudang/master data/suppliers/UpdateSupplier';
import SuppliersPage from 'pages/admingudang/master data/suppliers/SupplierPages';
import WarehouseFormPage from 'pages/admingudang/master product/warehouse/FormWarehouse';
import DoctorsPage from 'pages/admingudang/master data/doctor/DoctorPage';
import DoctorFormPage from 'pages/admingudang/master data/doctor/FormDoctor';
import CustomerFormPage from 'pages/admingudang/master data/customer/FormCustomer';
import CustomersPage from 'pages/admingudang/master data/customer/CustomerPage';
import UpdateCustomerForm from 'pages/admingudang/master data/customer/UpdateCustomer';
import UpdateDoctorForm from 'pages/admingudang/master data/doctor/UpdateDoctor';
import UpdateWarehouse from 'pages/admingudang/master product/warehouse/UpdateWarehouse';
import ProductFormPage from 'pages/admingudang/master product/products/FormProduct';
import ProductUpdateFormPage from 'pages/admingudang/master product/products/UpdateProducts';
import ChooseTransactionPage from 'pages/apoteker/transactions/choose.transactionspages';
import PrescriptionsPage from 'pages/apoteker/prescriptions/prescriptionpage';
import PrescriptionForm from 'pages/apoteker/prescriptions/form.addprescription';
import TransactionPrescriptionForm from 'pages/apoteker/prescriptions/transprescription.confirmpay';
import GeneralTransactionForm from 'pages/apoteker/generic/generic.transaction';
import PaymentPopup from 'pages/apoteker/transactions/transpayment';
import Invoice from 'pages/apoteker/generic/invoice.generic';
import HistoryPage from 'pages/apoteker/generic/invoice.generic';
import InventoryFormPage from 'pages/admingudang/master inventory/inventory/FormInventory';
import InventoryUpdateFormPage from 'pages/admingudang/master inventory/inventory/UpdateInventory';
import TransactionHistoryTable from 'pages/apoteker/transactions/report.transactions';
import StockOpnamePage from 'pages/admingudang/master inventory/stock opname/Opnamepages';
import StockOpnameFormPage from 'pages/admingudang/master inventory/stock opname/FormOpname';
// import Transactions from 'pages/apoteker/transactions/transactionspages';
// import PrescriptionsPage from 'pages/apoteker/prescriptions/prescriptionpage';
// import PrescriptionPage from 'pages/transactions/prescription.pages.';

const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const SignIn = lazy(() => import('pages/authentication/SignIn'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const Page404 = lazy(() => import('pages/errors/Page404'));
const Units = lazy(() => import('pages/admingudang/master product/units/UnitsPages'));
const WelcomePage = lazy(() => import('pages/welcomPages/Pages.welcome'));
const ProductsPages = lazy(() => import('pages/admingudang/master product/products/ProductsPages'));
const CategoriesPage = lazy(
  () => import('pages/admingudang/master product/categories/CategoriesPages'),
);

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
          {
            path: paths.createUnits,
            element: <UnitsFormPage />,
          },
          {
            path: paths.updateUnits,
            element: <UpdateUnitsForm />,
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
          {
            path: paths.createProduct,
            element: <ProductFormPage />,
          },
          {
            path: paths.updateProduct,
            element: <ProductUpdateFormPage />,
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
          {
            path: paths.createCategory,
            element: <CategoriesFormPage />,
          },
          {
            path: paths.updateCategory,
            element: <UpdateCategoryForm />,
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
          {
            path: paths.createWarehouse,
            element: <WarehouseFormPage />,
          },
          {
            path: paths.updateWarehouse,
            element: <UpdateWarehouse />,
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
          {
            path: paths.createInventory,
            element: <InventoryFormPage />,
          },
          {
            path: paths.updateInventory,
            element: <InventoryUpdateFormPage />,
          },
        ],
      },
      {
        path: rootPaths.stockopname,
        element: (
          <MainLayout title="Stock Opname">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.stockopname,
            element: <StockOpnamePage />,
          },
          {
            path: paths.createStockopname,
            element: <StockOpnameFormPage />,
          },
        ],
      },
      {
        path: rootPaths.suppliers,
        element: (
          <MainLayout title="Suppliers">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.suppliers,
            element: <SuppliersPage />,
          },
          {
            path: paths.createSupplier,
            element: <SupplierFormPage />,
          },
          {
            path: paths.updateSupplier,
            element: <UpdateSupplierForm />,
          },
        ],
      },
      {
        path: rootPaths.doctors,
        element: (
          <MainLayout title="Doctors">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.doctors,
            element: <DoctorsPage />,
          },
          {
            path: paths.createDoctor,
            element: <DoctorFormPage />,
          },
          {
            path: paths.updateDoctor,
            element: <UpdateDoctorForm />,
          },
        ],
      },
      {
        path: rootPaths.customers,
        element: (
          <MainLayout title="Customers">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.customers,
            element: <CustomersPage />,
          },
          {
            path: paths.createCustomer,
            element: <CustomerFormPage />,
          },
          {
            path: paths.updateCustomer,
            element: <UpdateCustomerForm />,
          },
        ],
      },
      {
        path: rootPaths.transactions,
        element: (
          <MainLayout title="Transactions">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.chooseTransaction,
            element: <ChooseTransactionPage />,
          },
          {
            path: paths.generictransaction,
            element: <GeneralTransactionForm />,
          },
          {
            path: paths.getTransactionById,
            element: <HistoryPage />,
          },
        ],
      },
      {
        path: rootPaths.transactionspayment,
        element: (
          <MainLayout title="Prescription Redeemtion">
            <Suspense fallback={<PageLoader />}>
              <TransactionPrescriptionForm />
            </Suspense>
          </MainLayout>
        ),
      },
      {
        path: rootPaths.prescription,
        element: (
          <MainLayout title="Prescription">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            path: paths.prescription,
            element: <PrescriptionsPage />,
          },
          {
            path: paths.createPrescription,
            element: <PrescriptionForm />,
          },
        ],
      },
      {
        path: rootPaths.reportgenerictransaction,
        element: (
          <MainLayout title="Report Transactions">
            <Suspense fallback={<PageLoader />}>
              <TransactionHistoryTable />
            </Suspense>
          </MainLayout>
        ),
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

const router = createBrowserRouter(routes, { basename: '/' });

export default router;
