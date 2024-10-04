// paths.ts
export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  units: 'master-product',
  products: 'master-product',
};

export default {
  signin: `/${rootPaths.authRoot}/sign-in`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  units: `/${rootPaths.units}/units`,
  products: `/${rootPaths.products}/products`,
};
