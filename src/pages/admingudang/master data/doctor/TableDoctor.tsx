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
import { DoctorDtoOut } from 'Dto/doctor/doctor.dto';
import ConfirmationDialog from 'components/common/ConfirmationDelete';
import { deleteDoctor } from 'service/doctor.service';

export interface DoctorsTableProps {
  tableData: DoctorDtoOut[];
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handleEdit: (id: number) => void;
}

const DoctorsTable: React.FC<DoctorsTableProps> = ({
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
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const openDeleteModal = (id: number) => {
    setSelectedDoctorId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctorId(null);
  };

  const confirmDelete = async () => {
    if (selectedDoctorId) {
      try {
        await deleteDoctor(selectedDoctorId);
        await handleDelete(selectedDoctorId);
        setIsModalOpen(false);
        setIsSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete doctor:', error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleEditClick = (id: number) => {
    navigate(`/master-data/doctors/update/${id}`);
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
                  Specialization
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Phone Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                  Email
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
              tableData.map((doctor, index) => (
                <TableRow key={doctor.id ?? index}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.phoneNumber}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(doctor.id!)}
                      color="primary"
                      aria-label="edit"
                    >
                      <img src={EditIcon} alt="edit icon" width="24" height="24" />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(doctor.id!)}
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
                <TableCell colSpan={6} align="center">
                  <Typography>No doctors available.</Typography>
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
        title="Are you sure you want to delete this doctor?"
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
          Doctor deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DoctorsTable;
