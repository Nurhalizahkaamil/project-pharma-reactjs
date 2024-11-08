import React, { useState, useEffect } from 'react';
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
import { WarehouseDtoOut } from 'Dto/warehousesDto/warehouses.dto';
import { SupplierDtoOut } from 'Dto/supplierDto/supplier.dto';
import ConfirmationDialog from 'components/common/ConfirmationDelete';
import { deleteWarehouse, getSuppliers } from 'service/warehouses.service';

interface WarehousesTableProps {
  tableData: WarehouseDtoOut[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  totalPages?: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
}

const WarehousesTable: React.FC<WarehousesTableProps> = ({
  tableData,
  handleDelete,
  currentPage,
  totalItems,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierDtoOut[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers(); // Ambil data supplier dari API
        setSuppliers(response.data); // Pastikan untuk menyesuaikan dengan struktur data yang benar
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const openDeleteModal = (id: number) => {
    setSelectedWarehouseId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouseId(null);
  };

  const confirmDelete = async () => {
    if (selectedWarehouseId) {
      try {
        await deleteWarehouse(selectedWarehouseId);
        await handleDelete(selectedWarehouseId);
        setIsModalOpen(false);
        setIsSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete warehouse:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleEditClick = (id: number) => {
    navigate(`/master-inventory/warehouse/update/${id}`);
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
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Supplier
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
              tableData.map((warehouse, index) => (
                <TableRow key={warehouse.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>
                    {/* {
                      suppliers.find(suppliers => suppliers.id === warehouse.supplierId)?.name || 'Unknown Supplier'
                    } */}
                    {warehouse.supplier.name}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(warehouse.id)}
                      color="primary"
                      aria-label="edit"
                    >
                      <img src={EditIcon} alt="edit icon" width="24" height="24" />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(warehouse.id)}
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
                <TableCell colSpan={5} align="center">
                  <Typography>No warehouses available.</Typography>
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
        title={''}
      />

      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Warehouse deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default WarehousesTable;
