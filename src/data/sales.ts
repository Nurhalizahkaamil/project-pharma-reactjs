import { SvgIconProps } from '@mui/material';

export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

export const sales: SaleItem[] = [
  {
    label: 'Product Entry',
    value: '5',
    growth: '+8%',
    bgColor: 'error.lighter',
  },
  {
    label: 'Outbound Product',
    value: '300',
    growth: '+5%',
    bgColor: 'warning.lighter',
  },
  {
    label: 'Available Stock',
    value: '140',
    growth: '+1.2%',
    bgColor: 'success.lighter',
  },
  {
    label: 'Supplier Data',
    value: '8',
    growth: '+0.5%',
    bgColor: 'secondary.lighter',
  },
  {
    label: 'Exp Product Data',
    value: '34',
    growth: '+0.5%',
    bgColor: 'secondary.lighter',
  },
];
