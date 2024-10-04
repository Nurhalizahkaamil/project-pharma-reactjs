import { SvgIconProps } from '@mui/material';
import paths, { rootPaths } from './paths';
import DashboardIcon from 'components/icons/DashboardIcon';

export interface MenuItem {
  id: number;
  name: string;
  pathName: string;
  path?: string;
  active?: boolean;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
  items?: MenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: rootPaths.root,
    pathName: 'dashboard',
    svgIcon: DashboardIcon,
    active: true,
  },
  {
    id: 13,
    name: 'Authentication',
    pathName: 'authentication',
    icon: 'material-symbols:security-rounded',
    active: true,
    items: [
      {
        id: 14,
        name: 'Sign in',
        path: paths.signin,
        pathName: 'sign-in',
        active: true,
      },
      {
        id: 15,
        name: 'Sign up',
        path: paths.signup,
        pathName: 'sign-up',
        active: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Master Products',
    pathName: 'master-products',
    icon: 'ri:bar-chart-line',
    active: true,
    items: [
      {
        id: 3,
        name: 'Units',
        path: paths.units, // Ubah dari '#!' ke path yang benar
        pathName: 'units',
        active: true,
      },
      {
        id: 4,
        name: 'Categories',
        path: '/categories', // Sesuaikan path dengan yang akan digunakan
        pathName: 'categories',
        active: true,
      },
      {
        id: 5,
        name: 'Products',
        path: paths.products, // Sesuaikan path dengan yang akan digunakan
        pathName: 'products',
        active: true,
      },
    ],
  },
  {
    id: 6,
    name: 'Master Inventory',
    path: '/master-inventory', // Path yang akan mengarah ke inventory
    pathName: 'sales-report',
    icon: 'ph:chart-line',
    items: [
      {
        id: 7,
        name: 'Warehouse',
        path: '/warehouse', // Sesuaikan dengan rute yang diinginkan
        pathName: 'warehouse',
        active: true,
      },
      {
        id: 8,
        name: 'Inventories',
        path: '/inventories', // Sesuaikan dengan rute yang diinginkan
        pathName: 'inventories',
        active: true,
      },
    ],
  },
  {
    id: 9,
    name: 'Supplier',
    path: '/supplier', // Sesuaikan path dengan routing yang ada
    pathName: 'supplier',
    icon: 'mdi:message-processing-outline',
  },
  {
    id: 10,
    name: 'Report Entry Product',
    path: '/report-entry-product', // Sesuaikan path
    pathName: 'report-entry-product',
    icon: 'fluent:settings-24-regular',
    active: true,
  },
  {
    id: 11,
    name: 'Profile',
    path: '/profile', // Sesuaikan dengan routing profil
    pathName: 'profile',
    icon: 'fluent:settings-24-regular',
    active: true,
  },
  {
    id: 12,
    name: 'Sign Out',
    path: '/sign-out', // Tentukan aksi sign out atau routingnya
    pathName: 'sign-out',
    icon: 'humbleicons:logout',
    active: true,
  },
];

export default sitemap;
