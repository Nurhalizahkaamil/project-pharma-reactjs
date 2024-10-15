import { Typography, Stack, Pagination, PaginationItem } from '@mui/material';
import {
  gridPageSelector,
  gridPageCountSelector,
  useGridSelector,
  gridPageSizeSelector,
  gridPaginationRowRangeSelector,
  gridExpandedRowCountSelector,
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { MutableRefObject } from 'react';
import { styled } from '@mui/material/styles'; // Ganti import ini

// Styled pagination button with green color
const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  borderRadius: '50%',
  border: `1px solid #76C893`,
  '&.Mui-selected': {
    backgroundColor: '#76C893',
    color: theme.palette.common.white,
    boxShadow: '12px #76C893',
  },
}));

const CustomPagination = ({ apiRef }: { apiRef: MutableRefObject<GridApiCommunity> }) => {
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const filteredRows = useGridSelector(apiRef, gridExpandedRowCountSelector);
  const paginationRowRange = useGridSelector(apiRef, gridPaginationRowRangeSelector);

  const from = paginationRowRange ? page * pageSize + 1 : 0;
  const to = paginationRowRange
    ? page + 1 === pageCount
      ? paginationRowRange.lastRowIndex + 1
      : page * pageSize + pageSize
    : 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      gap={2}
      sx={{ width: 1, overflow: 'auto' }}
    >
      <Typography variant="subtitle2" color="grey.600">
        {`Showing ${from}-${to} of ${filteredRows}`}
      </Typography>
      <Pagination
        size="medium"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => {
          event.preventDefault();
          apiRef.current.setPage(value - 1);
        }}
        renderItem={(item) => <StyledPaginationItem {...item} />}
      />
    </Stack>
  );
};

export default CustomPagination;
