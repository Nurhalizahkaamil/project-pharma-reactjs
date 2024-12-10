import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { TransactionDtoOut } from 'Dto/transaction/transaction.dto';
import { TransactionDetailDtoOut } from 'Dto/transaction/transaction.detail.dto';
import { getTransactions } from 'service/transaction.service';
import { getProducts } from 'service/product.service';

const TransactionHistoryTable: React.FC = () => {
  const [tableData, setTableData] = useState<TransactionDtoOut[]>([]);
  const [productMap, setProductMap] = useState<Map<number, string>>(new Map());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Fetch transactions and product data
  const fetchTransactions = async () => {
    try {
      const params = { page: currentPage, limit: itemsPerPage };
      const response = await getTransactions(params);
      setTableData(response.data);
      setTotalItems(response.metadata.total);

      // Ambil semua productId unik dari transaksi
      const productIds = new Set<number>();
      response.data.forEach((transaction: TransactionDtoOut) => {
        transaction.items.forEach((detail: TransactionDetailDtoOut) => {
          productIds.add(detail.productId);
        });
      });

      // Fetch all product names and store in Map
      const productResponse = await getProducts(); // Ambil semua produk
      const productsMap = new Map<number, string>();

      productResponse.data.forEach((product: any) => {
        productsMap.set(product.id, product.name);
      });

      setProductMap(productsMap);
    } catch (error) {
      console.error('Error fetching transactions or products:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Transaction Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Transaction Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Payment Method
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Transaction Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Product Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Grand Total
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Body Table */}
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((transaction, index) => (
                <TableRow key={transaction.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{`TRX-${transaction.id}`}</TableCell>
                  <TableCell>
                    {new Date(transaction.transactionDate).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell>{transaction.paymentMethod || 'N/A'}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>
                    {transaction.items.map((item) => item.product.name).join(', ')}
                  </TableCell>
                  <TableCell>{transaction.items.map((item) => item.quantity).join(', ')}</TableCell>
                  <TableCell>{transaction.grandTotal.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>No transactions available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Footer Table */}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalItems}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TransactionHistoryTable;
