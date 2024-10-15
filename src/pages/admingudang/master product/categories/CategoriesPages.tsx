import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateCategoriesButton from './CreateCategories';
import CategoriesTable from './TableCategories'; // Pastikan import nama file yang benar
import { CategoriesDto } from 'Dto/categories/categories.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getCategories } from 'service/categories.service';

const CategoriesPage = () => {
  // State untuk data tabel
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState<CategoriesDto[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data untuk tabel kategori
  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };
      const response = await getCategories(params);
      if (response && Array.isArray(response.data)) {
        setTableData(response.data as CategoriesDto[]); // Pastikan ini sesuai
        setTotalItems(response.metadata.total);
      } else {
        console.error('Expected an array but got:', response);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);

  const handleEdit = (id: number) => {
    console.log('Edit:', id);
    // Tambahkan logika untuk mengarahkan ke halaman edit jika diperlukan
  };

  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    // Tambahkan logika untuk menghapus kategori dari API dan memperbarui state
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateCategoriesButton />
      </Box>
      <CategoriesTable
        categories={tableData} // Menggunakan prop categories
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default CategoriesPage;
