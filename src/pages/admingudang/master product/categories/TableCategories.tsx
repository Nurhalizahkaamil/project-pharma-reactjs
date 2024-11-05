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
import { CategoriesDto } from 'Dto/categories/categories.dto';
import ConfirmationDialog from 'components/common/ConfirmationDelete';
import { deleteCategories } from 'service/categories.service';

interface CategoriesTableProps {
  tableData: CategoriesDto[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  currentPage: number;
  totalItems: number;
  totalPages?: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const openDeleteModal = (id: number) => {
    setSelectedCategoryId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
  };

  const confirmDelete = async () => {
    if (selectedCategoryId) {
      try {
        await deleteCategories(selectedCategoryId); // Menghapus dari server
        handleDelete(selectedCategoryId); // Menghapus dari state di frontend
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
    navigate(`/master-product/categories/update/${id}`);
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
                  Image
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
              tableData.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    {category.categoryImageUrl ? (
                      <img
                        src={category.categoryImageUrl}
                        alt="Category"
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No Image
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditClick(category.id)}
                      color="primary"
                      aria-label="edit"
                    >
                      <img src={EditIcon} alt="edit icon" width="24" height="24" />
                    </IconButton>
                    <IconButton
                      onClick={() => openDeleteModal(category.id)}
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
                  <Typography>No categories available.</Typography>
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
        title="Are you sure you want to delete this category?"
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
          Category deleted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CategoriesTable;
