// sitemap.ts
import { SvgIconTypeMap } from '@mui/material';
import paths from './paths';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// Update the type for svgIcon
export interface MenuItem {
  id: number;
  name: string;
  pathName: string;
  path?: string;
  active?: boolean;
  icon?: string;
  svgIcon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>; // Correct type for MUI icons
  items?: MenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: paths.dashboard,
    pathName: 'dashboard',
    svgIcon: DashboardIcon, // Directly pass the MUI icon component
    active: true,
  },
  {
    id: 2,
    name: 'Master Products',
    pathName: 'master-products',
    svgIcon: Inventory2Icon, // Directly pass the MUI icon component
    active: true,
    items: [
      {
        id: 3,
        name: 'Units',
        path: paths.units,
        pathName: 'units',
        active: true,
      },
      {
        id: 4,
        name: 'Categories',
        path: paths.categories,
        pathName: 'categories',
        svgIcon: CategoryIcon, // Directly pass the MUI icon component
        active: true,
      },
      {
        id: 5,
        name: 'Products',
        path: paths.products,
        pathName: 'products',
        active: true,
      },
    ],
  },
  {
    id: 6,
    name: 'Master Inventory',
    pathName: 'master-inventory',
    svgIcon: WarehouseIcon, // Directly pass the MUI icon component
    active: true,
    items: [
      {
        id: 7,
        name: 'Warehouse',
        path: paths.warehouse,
        pathName: 'warehouse',
        active: true,
      },
      {
        id: 8,
        name: 'Inventories',
        path: paths.inventories,
        pathName: 'inventories',
        active: true,
      },
    ],
  },
  {
    id: 9,
    name: 'Master Data',
    pathName: 'master-data',
    svgIcon: LocalShippingIcon, // Directly pass the MUI icon component
    active: true,
    items: [
      {
        id: 10,
        name: 'Supplier',
        path: paths.suppliers,
        pathName: 'suppliers',
        active: true,
      },
      {
        id: 11,
        name: 'Doctor',
        path: paths.doctors,
        pathName: 'doctor',
        active: true,
      },
      {
        id: 12,
        name: 'Customer',
        path: paths.customers,
        pathName: 'customer',
        active: true,
      },
    ],
  },
  {
    id: 13,
    name: 'Transactions',
    path: '/transactions',
    pathName: 'transactions',
    svgIcon: ShoppingCartIcon,
    active: true,
  },
  {
    id: 14,
    name: 'Report Entry Product',
    path: '/report-entry-product',
    pathName: 'report-entry-product',
    svgIcon: AssignmentIcon, // Directly pass the MUI icon component
    active: true,
  },
  {
    id: 15,
    name: 'Profile',
    path: '/profile',
    pathName: 'profile',
    svgIcon: PersonIcon, // Directly pass the MUI icon component
    active: true,
  },
  {
    id: 16,
    name: 'Sign Out',
    path: '/sign-out',
    pathName: 'sign-out',
    svgIcon: ExitToAppIcon, // Directly pass the MUI icon component
    active: true,
  },
];

export default sitemap;
