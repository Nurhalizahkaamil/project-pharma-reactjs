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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleFilterStatusChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value);
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
          <MenuItem value="All Prescriptions">All Prescription</MenuItem>
          <MenuItem value="Redeemed">Already Redeemed</MenuItem>
          <MenuItem value="Not Redeemed">unredeemed</MenuItem>
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
                    {format(new Date(prescription.prescriptionDate), 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell>{prescription.prescriptionCode}</TableCell>
                  <TableCell>{prescription.customer.name}</TableCell>
                  <TableCell>{prescription.doctor.name}</TableCell>

                  <TableCell>{prescription.prescriptions}</TableCell>
                  <TableCell>
                    <Chip
                      label={prescription.isRedeem ? 'already redeemed' : 'unredeemed'}
                      color={prescription.isRedeem ? 'success' : 'error'}
                      size="small"
                      sx={{ color: '#fff' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      sx={{ marginRight: '8px' }}
                      onClick={() => handleDetail(prescription.id!)}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleRedeem(prescription.id!)}
                    >
                      Redeem
                    </Button>
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
