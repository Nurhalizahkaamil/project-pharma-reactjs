import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CreateCustomerButton from './CreateCustomer';
import CustomersTable from './TableCustomer';
import { CustomerDto } from 'Dto/customer/customer.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { deleteCustomer, getCustomers } from 'service/customer.service';

const CustomersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<CustomerDto[]>([]);
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
      const response = await getCustomers(params);
      console.log(response);

      if (response && Array.isArray(response.data)) {
        setTableData(response.data as CustomerDto[]);
        const total = response.metadata?.total ?? 0;
        const totalPages = response.metadata?.totalPages ?? 1;
        setTotalItems(total);
        setTotalPages(totalPages);
      } else {
        console.error('Expected an array but got:', response);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to fetch customers');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, itemsPerPage]);

  const handleEdit = (id: number) => {
    console.log('Edit:', id);
    navigate(`/update-customer/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    try {
      await deleteCustomer(id);
      toast.success('Customer deleted successfully');
      fetchDataPage(); // Refresh data after delete
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateCustomerButton />
      </Box>

      <CustomersTable
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

export default CustomersPage;
