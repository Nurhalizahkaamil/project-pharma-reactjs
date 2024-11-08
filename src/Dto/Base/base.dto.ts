export interface BaseDto {
  page: number;
  limit: number;
  keyword?: string;
  filterStatus?: string;
}
