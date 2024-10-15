export const rootPaths = {
  root: '/', // Root for WelcomePage
  pagesRoot: 'pages',
  authRoot: 'authentication',
  dashboard: 'dashboard', // Tetap
  units: 'master-product/units', // Path Units
  products: 'master-product/products', // Path Products
  categories: 'master-product/categories', // Path Categories
  inventory: 'master-inventory/inventory',
  warehouse: 'master-inventory/warehouse',
  inventories: 'master-inventory/inventories',
};

export default {
  signin: `/${rootPaths.authRoot}/sign-in`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  dashboard: `/${rootPaths.dashboard}`,
  units: `/${rootPaths.units}`, // Path Units diperbaiki
  products: `/${rootPaths.products}`, // Path Products diperbaiki
  categories: `/${rootPaths.categories}`,
  warehouse: `/${rootPaths.warehouse}`, // Path Warehouse // Path Categories diperbaiki
  inventories: `/${rootPaths.inventories}`,
};
