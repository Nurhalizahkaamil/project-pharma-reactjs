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
import { UnitsDto } from 'Dto/unitsDto/units.dto';
import ConfirmationDialog from 'components/common/ConfirmationDelete';
import { deleteUnits } from 'service/units.service';

interface UnitsTableProps {
  tableData: UnitsDto[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  totalPages?: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
}

const UnitsTable: React.FC<UnitsTableProps> = ({
  tableData = [], // Default value to avoid undefined
  handleEdit,
  handleDelete,
  currentPage,
  totalItems,
  totalPages,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnitsId, setSelectedUnitId] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const openDeleteModal = (id: number) => {
    setSelectedUnitId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUnitId(null);
  };

  const confirmDelete = async () => {
    if (selectedUnitsId !== null) {
      try {
        await deleteUnits(selectedUnitsId);
        await handleDelete(selectedUnitsId);
        setIsModalOpen(false);
        setIsSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleEditClick = (id: number) => {
    navigate(`/master-product/units/update/${id}`);
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
                  Description
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
            {tableData?.length > 0 ? (
              tableData.map((unit, index) => (
                <TableRow key={unit.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{unit.name}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(unit.id)}
                      color="primary"
                      aria-label="edit"
                    >
                      <img src={EditIcon} alt="edit icon" width="24" height="24" />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(unit.id)}
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
                  <Typography>No units available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalItems}
                page={currentPage - 1}
                onPageChange={(_, page) => handlePageChange(page + 1)}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={(event) => setItemsPerPage(parseInt(event.target.value, 10))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={isModalOpen}
        title="Are you sure you want to delete this unit?"
        onConfirm={confirmDelete}
        onClose={closeModal}
      />

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Unit deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UnitsTable;
