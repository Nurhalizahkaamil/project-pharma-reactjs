import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionById } from 'service/transaction.service';
import { getTransactionDetailById } from 'service/transaction.detail.service';
import { TransactionDtoOut } from 'Dto/transaction/transaction.dto';
import { TransactionDetailDtoOut } from 'Dto/transaction/transaction.detail.dto';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { CircularProgress } from '@mui/material';

const HistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<TransactionDtoOut | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetailDtoOut[]>([]);
  const [products, setProducts] = useState<ProductDtoOut[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const fetchedTransaction = await getTransactionById(Number(id));
        const fetchedDetails = await getTransactionDetailById(Number(id));

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

  const calculateTotal = () =>
    transactionDetails.reduce(
      (sum, detail) =>
        sum +
        (products.find((p) => p.id === detail.productId)?.sellingPrice || 0) * detail.quantity,
      0
    );

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
        borderRadius: '10px', // You can adjust the border radius here
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>INVOICE</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleDateString()}</p>
          <p><strong>No. Invoice:</strong> {transaction.id}</p>
        </div>
        <div>
          <p><strong>Payment Method:</strong> {transaction.paymentMethod}</p>
          <p><strong>Bank Name:</strong> Borelle Bank</p>
          <p><strong>Account Number:</strong> 0123 4567 89</p>
        </div>
      </div>
      <div>
        <p><strong>Bill to:</strong></p>
        <p>123 Anywhere St., Galaxy City, ST 12345</p>
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Qty</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails.map((detail) => {
            const product = products.find((p) => p.id === detail.productId);
            return (
              <tr key={detail.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {product?.name || 'Unknown'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  Rp {product?.sellingPrice?.toLocaleString() || '0'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.quantity}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  Rp {(product?.sellingPrice || 0) * detail.quantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p><strong>Total:</strong> Rp {calculateTotal().toLocaleString()}</p>
      </div>
      <footer style={{ textAlign: 'center', marginTop: '30px' }}>
        <p><strong>THANK YOU!</strong></p>
        <p>
          <a href="tel:+1234567890">+123-456-7890</a> |{' '}
          <a href="mailto:hello@medqcare.com">hello@medqcare.com</a> |{' '}
          <a href="https://www.hellomedqcare.com">www.hellomedqcare.com</a>
        </p>
      </footer>
    </div>
  );
};

export default HistoryPage;
