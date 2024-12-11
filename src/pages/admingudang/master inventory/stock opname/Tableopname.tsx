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
  IconButton,
  TableFooter,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
import { StockOpnameDtoOut } from 'Dto/stock opname/stock.opname.dto';
import { useNavigate } from 'react-router-dom';
import { getProducts } from 'service/stockopname.service';
import { ProductDtoOut } from 'Dto/product/product.dto';
import DeleteIcon from 'assets/trash.png';
import EditIcon from 'assets/edit.png';
import ConfirmationDialog from 'components/common/ConfirmationDelete';

interface StockOpnameTableProps {
  tableData: StockOpnameDtoOut[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  totalPages?: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
}

const StockOpnameTable: React.FC<StockOpnameTableProps> = ({
  tableData,
  handleEdit,
  handleDelete,
  currentPage,
  totalItems,
  totalPages,
  setItemsPerPage,
  itemsPerPage,
  handlePageChange,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStockOpnameId, setSelectedStockOpnameId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [products, setProducts] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const productsMap = new Map<number, string>();

        response.data.forEach((product: ProductDtoOut) => {
          productsMap.set(product.id, product.name);
        });

        setProducts(productsMap);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const openDeleteModal = (id: number) => {
    setSelectedStockOpnameId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStockOpnameId(null);
  };

  const confirmDelete = async () => {
    if (selectedStockOpnameId !== null) {
      try {
        await handleDelete(selectedStockOpnameId);
        setIsModalOpen(false);
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete stock opname:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEditClick = (id: number) => {
    navigate(`/manage-inventory/stokopname/update/${id}`);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Physical Stock</TableCell>
              <TableCell>Discrepancy</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((opname, index) => (
                <TableRow key={opname.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{new Date(opname.opnameDate).toISOString().split('T')[0]}</TableCell>
                  <TableCell>{opname.items.map((item) => item.productName).join(', ')}</TableCell>
                  <TableCell>{opname.items.map((item) => item.physicalStock).join(', ')}</TableCell>
                  <TableCell>{opname.items.map((item) => item.discrepancy).join(', ')}</TableCell>
                  <TableCell>{opname.note}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(opname.id)} color="primary">
                      <img src={EditIcon} alt="Edit" width="24" height="24" />
                    </IconButton>
                    <IconButton onClick={() => openDeleteModal(opname.id)} color="secondary">
                      <img src={DeleteIcon} alt="Delete" width="24" height="24" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No stock opname records found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalItems}
                page={currentPage - 1}
                onPageChange={handlePageChange} // Now correctly handles the event and page number
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Are you sure you want to delete this stock opname record?"
      />

      {/* Snackbar Notification */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Stock Opname record deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default StockOpnameTable;
