export const rootPaths = {
  root: '/', // Root for WelcomePage
  pagesRoot: 'pages',
  authRoot: 'authentication',
  dashboard: 'dashboard',
  units: 'master-product',
  products: 'master-product',
};

export default {
  signin: `/${rootPaths.authRoot}/sign-in`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  dashboard: `/${rootPaths.dashboard}/dashboard`,
  units: `/${rootPaths.units}/units`,
  products: `/${rootPaths.products}/products`,
};
