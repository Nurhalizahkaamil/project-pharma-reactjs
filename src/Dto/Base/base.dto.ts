import { TransactionType } from 'Dto/transaction/transaction.dto';

export interface BaseDto {
  page: number;
  limit: number;
  keyword?: string;
  filterStatus?: string;
}
