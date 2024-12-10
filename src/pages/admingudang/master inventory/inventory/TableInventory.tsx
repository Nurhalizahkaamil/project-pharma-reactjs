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
import { InventoryDtoOut } from 'Dto/inventories/inventory.dto';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteInventory } from 'service/inventory.service';
import DeleteIcon from 'assets/trash.png';
import EditIcon from 'assets/edit.png';
import ConfirmationDialog from 'components/common/ConfirmationDelete';

interface InventoryTableProps {
  tableData: InventoryDtoOut[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  totalPages?: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
}

const InventoriesTable: React.FC<InventoryTableProps> = ({
  tableData,
  handleDelete,
  currentPage,
  totalItems,
  setItemsPerPage,
  itemsPerPage,
  handlePageChange,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [products, setProducts] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Get data from the API
        const productsMap = new Map<number, string>();
  
        // Assuming response.data is an array of ProductDtoOut objects
        response.data.forEach((product: ProductDtoOut) => {
          productsMap.set(product.id, product.name); // or whatever properties exist on ProductDtoOut
        });
  
        setProducts(productsMap); // Set the products as a Map
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  const openDeleteModal = (id: number) => {
    setSelectedInventoryId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventoryId(null);
  };

  const confirmDelete = async () => {
    if (selectedInventoryId) {
      try {
        await deleteInventory(selectedInventoryId);
        await handleDelete(selectedInventoryId);
        setIsModalOpen(false);
        setIsSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete inventory:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleEditClick = (id: number) => {
    navigate(`/master-inventory/inventories/update/${id}`);
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
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Name of product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Note for Items
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Note for Inventory
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Inventory Type
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Reason
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
              tableData.map((inventory, index) => (
                <TableRow key={inventory.id}>
                  {/* Nomor Urut */}
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>

                  {/* Tanggal Inventaris */}
                  <TableCell>
                    {new Date(inventory.inventoryDate).toISOString().split('T')[0]}
                  </TableCell>

                  {/* Nama Produk */}
                  <TableCell>
                  {inventory.items.map(item => item.product.name).join(', ')}
                  </TableCell>
                  <TableCell>{inventory.items.map((item) => item.qtyItem).join(', ')}</TableCell>
                  <TableCell>{inventory.items.map((item) => item.noteItem).join(', ')}</TableCell>
                  <TableCell>{inventory.note}</TableCell>
                  <TableCell>{inventory.inventoryType}</TableCell>
                  <TableCell>{inventory.reasonType}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(inventory.id)}
                      color="primary"
                      aria-label="edit"
                    >
                      <img src={EditIcon} alt="edit icon" width="24" height="24" />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(inventory.id)}
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
                <TableCell colSpan={8} align="center">
                  <Typography>No inventories available.</Typography>
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
        title={'Do you want to delete this inventory?'}
      />

      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Inventory deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default InventoriesTable;
