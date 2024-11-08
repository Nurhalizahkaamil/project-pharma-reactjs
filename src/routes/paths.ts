import { create } from "@mui/material/styles/createTransitions";

export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  dashboard: 'dashboard',
  units: 'master-product/units',
  products: 'master-product/products',
  createProduct: 'master-product/products/create',
  updateProduct: 'master-product/products/update/:id',
  categories: 'master-product/categories',
  createCategory: 'master-product/categories/create',
  updateCategory: 'master-product/categories/update/:id',
  createUnits: 'master-product/units/create',
  updateUnits: 'master-product/units/update/:id',
  warehouse: 'master-inventory/warehouse',
  createWarehouse: 'master-inventory/warehouse/create',
  updateWarehouse: 'master-inventory/warehouse/update/:id',
  inventories: 'master-inventory/inventories',
  suppliers: 'master-data/suppliers',
  createSupplier: 'master-data/suppliers/create',
  updateSupplier: 'master-data/suppliers/update/:id',
  doctors: 'master-data/doctors',
  createDoctor: 'master-data/doctors/create',
  updateDoctor: 'master-data/doctors/update/:id',
  customers: 'master-data/customers',
  createCustomer: 'master-data/customers/create',
  updateCustomer: 'master-data/customers/update/:id',
  transactions: 'transactions',
  prescription: 'prescriptions',
  createPrescription: 'prescriptions/create',
};

export default {
  signin: `/${rootPaths.authRoot}/sign-in`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  dashboard: `/${rootPaths.dashboard}`,
  units: `/${rootPaths.units}`,
  products: `/${rootPaths.products}`,
  createProduct: `/${rootPaths.createProduct}`,
  updateProduct: `/${rootPaths.updateProduct}`,
  categories: `/${rootPaths.categories}`,
  createCategory: `/${rootPaths.createCategory}`,
  updateCategory: `/${rootPaths.updateCategory}`,
  createUnits: `/${rootPaths.createUnits}`,
  updateUnits: `/${rootPaths.updateUnits}`,
  warehouse: `/${rootPaths.warehouse}`,
  createWarehouse: `/${rootPaths.createWarehouse}`,
  updateWarehouse: `/${rootPaths.updateWarehouse}`,
  inventories: `/${rootPaths.inventories}`,
  suppliers: `/${rootPaths.suppliers}`,
  createSupplier: `/${rootPaths.createSupplier}`,
  updateSupplier: `/${rootPaths.updateSupplier}`,
  doctors: `/${rootPaths.doctors}`,
  createDoctor: `/${rootPaths.createDoctor}`,
  updateDoctor: `/${rootPaths.updateDoctor}`,
  customers: `/${rootPaths.customers}`,
  createCustomer: `/${rootPaths.createCustomer}`,
  updateCustomer: `/${rootPaths.updateCustomer}`,
  transactions: `/${rootPaths.transactions}`,
  prescription: `/${rootPaths.prescription}`,
  createPrescription: `/${rootPaths.createPrescription}`,
};
