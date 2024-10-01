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
        path: '#!',
        pathName: 'units',
        active: true,
      }, // Add missing comma here
      {
        id: 4,
        name: 'Categories',
        path: '#!',
        pathName: 'categories', // Typo fixed from 'cstrgories'
        active: true,
      }, // Add missing comma here
      {
        id: 5,
        name: 'Products',
        path: '#!',
        pathName: 'products',
        active: true,
      }, // Add missing comma here
    ],
  },
  {
    id: 6,
    name: 'Master Inventory',
    path: '#!',
    pathName: 'sales-report',
    icon: 'ph:chart-line',
    items: [
      {
        id: 7,
        name: 'Warehouse',
        path: '#!',
        pathName: 'warehouse',
        active: true,
      }, // Add missing comma here
      {
        id: 8,
        name: 'Inventories',
        path: '#!',
        pathName: 'inventories', // Typo fixed from 'cstrgories'
        active: true,
      },
    ],
  },
  {
    id: 9,
    name: 'Supplier',
    path: '#!',
    pathName: 'supplier',
    icon: 'mdi:message-processing-outline',
  },
  {
    id: 10,
    name: 'Report Enntry Product',
    path: '#!',
    pathName: 'report-enntry-product',
    icon: 'fluent:settings-24-regular',
    active: true,
  },
  {
    id: 11,
    name: 'Profile',
    path: '#!',
    pathName: 'profile',
    icon: 'fluent:settings-24-regular',
    active: true,
  },
  {
    id: 12,
    name: 'Sign Out',
    path: '#!',
    pathName: 'sign-out',
    icon: 'humbleicons:logout',
    active: true,
  },
];

export default sitemap;
