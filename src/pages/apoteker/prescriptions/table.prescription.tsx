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
  TableFooter,
  TablePagination,
  Button,
  MenuItem,
  Select,
  TextField,
  Chip,
} from '@mui/material';
import { PrescriptionDtoOut } from 'Dto/prescriptions/prescription.dto';
import { format } from 'date-fns';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

interface PrescriptionTableProps {
  tableData: PrescriptionDtoOut[];
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: (page: number) => void;
  handleDetail: (id: number) => void;
  handleRedeem: (id: number) => void;
  filterStatus: string;
  handleFilterStatusChange: (status: string) => void;
}

const PrescriptionTable: React.FC<PrescriptionTableProps> = ({
  tableData,
  currentPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  handlePageChange,
  handleDetail,
  handleRedeem,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All Prescriptions');
  const navigate = useNavigate(); // Initialize navigate function
  const [redeemed, setRedeemed] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleFilterStatusChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value);
  };

  // Updated handleRedeem function to include navigation
  const handleRedeemClick = (id: number) => {
    handleRedeem(id); // Optionally handle redeem logic
    navigate(`/transactions/prescriptionconfirmpay/${id}`, { state: { prescriptionId: id } }); // Pass prescriptionId to next page
    setRedeemed(true);
  };

  return (
    <Paper
      sx={{
        padding: '20px',
        width: '110%',
        height: '70vh',
        margin: '0.5px',
        marginTop: '5px',
        overflow: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <TextField
          placeholder="Search by Code"
          variant="outlined"
          size="small"
          value={searchKeyword}
          onChange={handleSearchChange}
          sx={{ width: '300px' }}
        />
        <Select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          variant="outlined"
          size="small"
          sx={{ width: '200px' }}
        >
          <MenuItem value="All Prescriptions">All Prescriptions</MenuItem>
          <MenuItem value="Redeemed">Already Redeemed</MenuItem>
          <MenuItem value="Not Redeemed">Unredeemed</MenuItem>
        </Select>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'No',
                'Date',
                'Prescription Code',
                'Customer',
                'Doctor',
                'Detail Prescription',
                'Status',
                'Actions',
              ].map((header) => (
                <TableCell key={header}>
                  <Typography variant="subtitle2" sx={{ color: '#4a4a4a', fontWeight: 'bold' }}>
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((prescription, index) => (
                <TableRow key={prescription.id}>
                  <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                  <TableCell>
                    {format(new Date(prescription.prescriptionDate), 'dd/MM/yyyy HH:mm a')}
                  </TableCell>
                  <TableCell>{prescription.prescriptionCode}</TableCell>
                  <TableCell>{prescription.customer.name}</TableCell>
                  <TableCell>{prescription.doctor.name}</TableCell>
                  <TableCell>{prescription.prescriptions}</TableCell>
                  <TableCell>
                    <Chip
                      label={prescription.isRedeem ? 'Already Redeemed' : 'Unredeemed'}
                      color={prescription.isRedeem ? 'success' : 'error'}
                      size="small" // Base size
                      sx={{
                        color: '#fff', // Text color
                        fontSize: '0.75rem', // Smaller font size
                        height: '20px', // Reduced height
                        padding: '0 6px', // Smaller padding for the left and right
                        '& .MuiChip-label': {
                          padding: '0 4px', // Adjust padding inside the label
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        variant="outlined" // Outline style for Detail button with blue border and text
                        size="small"
                        sx={{
                          marginRight: '8px',
                          color: 'blue', // Blue text color
                          borderColor: 'blue', // Blue border
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 255, 0.1)', // Light blue hover effect
                          },
                        }}
                        onClick={() => handleDetail(prescription.id!)}
                      >
                        Detail
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        disabled={prescription.isRedeem && prescription.isPaid} // Disable if redeemed and paid
                        sx={{
                          backgroundColor:
                            prescription.isRedeem && prescription.isPaid ? 'grey' : 'blue', // Grey if redeemed, else blue
                          color: 'white', // White text
                          '&:hover': {
                            backgroundColor:
                              prescription.isRedeem && prescription.isPaid ? 'grey' : 'darkblue', // No hover effect if disabled
                          },
                        }}
                        onClick={() => handleRedeemClick(prescription.id!)}
                      >
                        {prescription.isRedeem && prescription.isPaid ? 'Redeemed' : 'Redeem'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>There is no data available.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalItems}
                page={currentPage - 1}
                onPageChange={(_, newPage) => handlePageChange(newPage + 1)}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={(event) => setItemsPerPage(parseInt(event.target.value, 10))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PrescriptionTable;
