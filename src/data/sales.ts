import { SvgIconProps } from '@mui/material';
import OrderIcon from 'components/icons/OrderIcon';

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    label: 'Product Entry',
    value: '5',
    growth: '+8%',
    bgColor: 'error.lighter',
    iconBackgroundColor: 'error.main',
  },
  {
    label: 'Outbound Product',
    value: '300',
    growth: '+5%',
    bgColor: 'warning.lighter',
    iconBackgroundColor: 'error.dark',
    svgIcon: OrderIcon,
  },
  {
    label: 'Available Stock',
    value: '140',
    growth: '+1.2%',
    bgColor: 'success.lighter',
    iconBackgroundColor: 'success.darker',
    icon: 'ion:pricetag',
  },
  {
    label: 'Supplier Data',
    value: '8',
    growth: '+0.5%',
    bgColor: 'secondary.lighter',
    iconBackgroundColor: 'secondary.main',
    icon: 'material-symbols:person-add',
  },
  {
    label: 'Exp Product Data',
    value: '34',
    growth: '+0.5%',
    bgColor: 'secondary.lighter',
    iconBackgroundColor: 'secondary.main',
    icon: 'material-symbols:person-add',
  },
];
