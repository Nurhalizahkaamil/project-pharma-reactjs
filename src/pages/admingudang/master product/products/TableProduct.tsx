import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TableFooter,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from 'assets/trash.png';
import EditIcon from 'assets/edit.png';
import { ProductDtoOut } from 'Dto/product/product.dto';
import ConfirmationDialog from 'components/common/ConfirmationDelete';

interface ProductsTableProps {
  tableData: ProductDtoOut[];
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  totalPages?: number;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (page: number) => void;
  handleEdit: (id: number) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  tableData,
  handleEdit,
  handleDelete,
  currentPage,
  totalItems,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const confirmDelete = async () => {
    if (selectedProductId) {
      try {
        await handleDelete(selectedProductId);
        setIsModalOpen(false);
        setIsSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleEditClick = (id: number) => {
    navigate(`/master-product/products/update/${id}`);
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
                  Product Images
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Product Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Purchase Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Selling Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Expiry Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Stock Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Unit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Drug Class
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>
                    {product.productImageUrl ? (
                      <img
                        src={product.productImageUrl}
                        alt={product.name}
                        width="50"
                        height="50"
                      />
                    ) : (
                      'No Image'
                    )}
                  </TableCell>
                  <TableCell>{product.productCode}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.purchasePrice}</TableCell>
                  <TableCell>{product.sellingPrice}</TableCell>
                  <TableCell>
                    {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{product.unit.name}</TableCell>
                  <TableCell>{product.drugClass || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(product.id as number)}
                      color="primary"
                      aria-label="edit"
                    >
                      <img src={EditIcon} alt="edit icon" width="24" height="24" />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(product.id)}
                      color="secondary"
                      aria-label="delete"
                    >
                      <img src={DeleteIcon} alt="delete icon" width="24" height="24" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={13} align="center">
                  <Typography>No products available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalItems}
                page={currentPage - 1}
                onPageChange={(_, newPage) => handlePageChange(newPage + 1)}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={(event) => setItemsPerPage(parseInt(event.target.value, 10))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Delete Product"
      />

      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ProductsTable;
