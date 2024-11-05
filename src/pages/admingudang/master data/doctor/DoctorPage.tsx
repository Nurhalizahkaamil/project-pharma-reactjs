import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateDoctorButton from './CreateDoctor';
import DoctorsTable from './TableDoctor';
import { DoctorDtoOut } from 'Dto/doctor/doctor.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { deleteDoctor, getDoctors } from 'service/doctor.service';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DoctorsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<DoctorDtoOut[]>([]);
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
      const response = await getDoctors(params);
      console.log(response);

      if (response && Array.isArray(response.data)) {
        setTableData(response.data as DoctorDtoOut[]);
        const total = response.metadata?.total ?? 0;
        const totalPages = response.metadata?.totalPages ?? 1;
        setTotalItems(total);
        setTotalPages(totalPages);
      } else {
        console.error('Expected an array but got:', response);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, itemsPerPage]);

  const handleEdit = (id: number) => {
    console.log('Edit:', id);
    navigate(`/update-doctor/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    // Tambahkan logika untuk menghapus dokter dari API dan memperbarui state
    try {
      // Assuming deleteDoctor is a function that removes the doctor from the server
      await deleteDoctor(id);
      toast.success('Doctor deleted successfully');
      fetchDataPage(); // Refresh data after delete
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast.error('Failed to delete doctor');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateDoctorButton />
      </Box>

      <DoctorsTable
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

export default DoctorsPage;
