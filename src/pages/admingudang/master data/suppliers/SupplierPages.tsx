import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateSupplierButton from './CreateSuppliers';
import SuppliersTable from './TableSupplier';
import { SupplierDtoOut } from 'Dto/supplierDto/supplier.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getSuppliers } from 'service/supplier.service';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SuppliersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<SupplierDtoOut[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
      };
      const response = await getSuppliers(params);
      console.log(response);

      if (response && Array.isArray(response.data)) {
        setTableData(response.data as SupplierDtoOut[]);
        const total = response.metadata?.total ?? 0;
        const totalPages = response.metadata?.totalPages ?? 1;
        setTotalItems(total);
        setTotalPages(totalPages);
      } else {
        console.error('Expected an array but got:', response);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching Suppliers:', error);
      toast.error('Failed to fetch suppliers');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, itemsPerPage]);

  const handleEdit = (id: number) => {
    console.log('Edit:', id);
    navigate(`/update-supplier/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    // Tambahkan logika untuk menghapus supplier dari API dan memperbarui state
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateSupplierButton />
      </Box>

      <SuppliersTable
        tableData={tableData}
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleEdit={handleEdit}
      />
    </Box>
  );
};

export default SuppliersPage;
