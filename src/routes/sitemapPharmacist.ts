import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReportIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import paths from './paths';
import { MenuItem } from './sitemap';

const sitemapPharmacist: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: paths.dashboard,
    pathName: 'dashboard',
    svgIcon: DashboardIcon,
    active: true,
  },
  {
    id: 2,
    name: 'Transactions',
    path: '/transactions',
    pathName: 'transactions',
    svgIcon: ShoppingCartIcon,
    active: true,
  },
  {
    id: 3,
    name: 'All Products',
    path: '/all-products',
    pathName: 'all-products',
    svgIcon: Inventory2Icon,
    active: true,
  },
  {
    id: 4,
    name: 'Report Outbound Product',
    path: '/report-outbound-product',
    pathName: 'report-outbound-product',
    svgIcon: ReportIcon,
    active: true,
  },
  {
    id: 5,
    name: 'Profile',
    path: '/profile',
    pathName: 'profile',
    svgIcon: PersonIcon,
    active: true,
  },
  {
    id: 6,
    name: 'Sign Out',
    path: '/sign-out',
    pathName: 'sign-out',
    svgIcon: ExitToAppIcon,
    active: true,
  },
];

export default sitemapPharmacist;
