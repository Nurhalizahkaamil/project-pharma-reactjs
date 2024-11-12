import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreatePrescriptionButton from './createbutton';
import PrescriptionTable from './table.prescription';
import { PrescriptionDtoOut } from 'Dto/prescriptions/prescription.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { deletePrescription, getPrescriptions } from 'service/precription.service';
import { toast } from 'react-hot-toast';

const PrescriptionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState('');
  const [tableData, setTableData] = useState<PrescriptionDtoOut[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<string>('All Prescriptions');

  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };
      // Pass filterStatus separately if needed
      const fetchParams = {
        ...params,
        filterStatus: filterStatus === 'All Prescriptions' ? '' : filterStatus,
      };

      const prescriptionsResponse = await getPrescriptions(fetchParams);

      if (
        prescriptionsResponse &&
        prescriptionsResponse.data &&
        Array.isArray(prescriptionsResponse.data)
      ) {
        const totalItemsNumber = Number(prescriptionsResponse.totalItems) || 0;
        setTotalItems(totalItemsNumber);
        setTotalPages(Math.ceil(totalItemsNumber / itemsPerPage));
        setTableData(prescriptionsResponse.data);
      } else {
        console.error('Unexpected response format for prescriptions:', prescriptionsResponse);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      toast.error('Failed to fetch prescriptions');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage, filterStatus]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterStatusChange = (status: string) => {
    setFilterStatus(status);
  };

  return (
    <Box sx={{ paddingTop: 2, paddingRight: 9, paddingBottom: 8, paddingLeft: 0.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <CreatePrescriptionButton />
      </Box>
      <PrescriptionTable
        tableData={tableData}
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handlePageChange={handlePageChange}
        handleDetail={() => {
          // Add logic for handleDetail if needed
        }}
        handleRedeem={() => {
          // Add logic for handleRedeem if needed
        }}
        filterStatus={filterStatus}
        handleFilterStatusChange={handleFilterStatusChange}
      />
    </Box>
  );
};

export default PrescriptionsPage;
