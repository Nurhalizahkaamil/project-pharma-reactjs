import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionById } from 'service/transaction.service';
import { getTransactionDetailById } from 'service/transaction.detail.service';
import { TransactionDtoOut } from 'Dto/transaction/transaction.dto';
import { TransactionDetailDtoOut } from 'Dto/transaction/transaction.detail.dto';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const HistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract transaction ID from URL params
  const [transaction, setTransaction] = useState<TransactionDtoOut | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetailDtoOut[]>([]);
  const [products, setProducts] = useState<ProductDtoOut[]>([]); // This should be populated with the product data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const fetchedTransaction = await getTransactionById(Number(id));
        const fetchedDetails = await getTransactionDetailById(Number(id));

        // Ensure fetchedDetails is always an array
        setTransaction(fetchedTransaction);
        setTransactionDetails(Array.isArray(fetchedDetails) ? fetchedDetails : [fetchedDetails]);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransactionData();
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!transaction) {
    return <div>No transaction found.</div>;
  }

  return (
    <div>
      <h1>Transaction History</h1>
      <p>
        <strong>Transaction ID:</strong> {transaction.id}
      </p>
      <p>
        <strong>User ID:</strong> {transaction.userId}
      </p>
      <p>
        <strong>Transaction Date:</strong> {new Date(transaction.transactionDate).toLocaleString()}
      </p>
      <p>
        <strong>Payment Method:</strong> {transaction.paymentMethod}
      </p>
      <p>
        <strong>Tax:</strong> Rp {transaction.tax.toLocaleString()}
      </p>
      <p>
        <strong>Grand Total:</strong> Rp {transaction.grandTotal.toLocaleString()}
      </p>

      <h2>Transaction Details</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionDetails.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell>
                {/* Assuming that the product's name is needed here */}
                {products.find((p) => p.id === detail.productId)?.name || 'Unknown'}
              </TableCell>
              <TableCell>{detail.quantity}</TableCell>
              <TableCell>
                Rp{' '}
                {products.find((p) => p.id === detail.productId)?.sellingPrice?.toLocaleString() ||
                  0}
              </TableCell>
              <TableCell>
                Rp{' '}
                {(
                  (products.find((p) => p.id === detail.productId)?.sellingPrice || 0) *
                  detail.quantity
                ).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryPage;
