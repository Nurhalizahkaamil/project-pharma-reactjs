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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { CategoriesDto } from 'Dto/categories/categories.dto';

interface CategoriesTableProps {
  categories: CategoriesDto[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => Promise<void>;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (page: number) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  handleEdit,
  handleDelete,
  currentPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  handlePageChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Handle Delete
  const openDeleteModal = (id: number) => {
    setSelectedCategoryId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategoryId) {
      await handleDelete(selectedCategoryId);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
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
                  Status
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
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        backgroundColor: category.status ? 'lightgreen' : 'lightcoral',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {category.status ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(category.id)}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => openDeleteModal(category.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Delete
                    </Button>
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

      {/* Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this category?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CategoriesTable;
