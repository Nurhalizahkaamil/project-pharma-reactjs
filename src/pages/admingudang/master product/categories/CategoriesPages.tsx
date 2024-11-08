import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateCategoriesButton from './CreateCategories';
import CategoriesTable from './TableCategories'; // Ensure correct file name
import { CategoriesDto } from 'Dto/categories/categories.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getCategories } from 'service/categories.service'; // Using getCategories for fetching data
import { toast } from 'react-hot-toast'; // If you want to keep using toast for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState<CategoriesDto[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data for categories table
  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };
      const response = await getCategories(params);
      console.log(response); // Tambahkan log untuk memeriksa respons

      // Pastikan untuk memeriksa struktur response
      if (response && Array.isArray(response.data)) {
        setTableData(response.data as CategoriesDto[]);
        const total = response.metadata?.total ?? 0; // Gunakan optional chaining dan default value
        const totalPages = response.metadata?.totalPages ?? 1; // Gunakan optional chaining dan default value
        setTotalItems(total);
        setTotalPages(totalPages);
      } else {
        console.error('Expected an array but got:', response);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching Categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);

  // Function for Delete
  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    // Add logic to delete category from API and update state
  };

  // Function to change pages
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function for searching
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Function to reset search
  const handleResetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Search and Add Category in one line */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateCategoriesButton />
      </Box>

      {/* Table */}
      <CategoriesTable
        tableData={tableData}
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleEdit={function (id: number): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default CategoriesPage;
