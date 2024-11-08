import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateUnitsButton from './CreateUnits';
import UnitsTable from './TableUnits'; // Ensure correct file name
import { UnitsDto } from 'Dto/unitsDto/units.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getUnits } from 'service/units.service'; // Using getUnits for fetching data
import { toast } from 'react-hot-toast'; // If you want to keep using toast for notifications

const UnitsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState('');
  const [tableData, setTableData] = useState<UnitsDto[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data for units table
  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };
      const response = await getUnits(params);
      console.log(response); // Tambahkan log untuk memeriksa respons

      // Pastikan untuk memeriksa struktur response
      if (response && Array.isArray(response.data)) {
        setTableData(response.data as UnitsDto[]);
        const total = response.metadata?.total ?? 0; // Gunakan optional chaining dan default value
        const totalPages = response.metadata?.totalPages ?? 1; // Gunakan optional chaining dan default value
        setTotalItems(total);
        setTotalPages(totalPages);
      } else {
        console.error('Expected an array but got:', response);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching Units:', error);
      toast.error('Failed to fetch units');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);

  // Function for Edit

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

  // Function to reset search

  return (
    <Box sx={{ padding: 3 }}>
      {/* Search and Add Unit in one line */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateUnitsButton />
      </Box>

      {/* Table */}
      <UnitsTable
        tableData={tableData}
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleEdit={function (_id: number): void {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default UnitsPage;
