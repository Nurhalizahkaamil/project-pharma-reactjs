import { useEffect, useState } from 'react';
import { StockOpnameDtoOut } from 'Dto/stock opname/stock.opname.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getStockOpnameEntries } from 'service/stockopname.service';
import { getProducts } from 'service/inventory.service';
import toast from 'react-hot-toast';
import { Box } from '@mui/system';
import CreateStockOpnameButton from './CreateOpname';
import StockOpnameTable from './Tableopname';

const StockOpnamePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState('');
  const [tableData, setTableData] = useState<StockOpnameDtoOut[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };

      const [stockopnameResponse, productsResponse] = await Promise.all([
        getStockOpnameEntries(params),
        getProducts(),
      ]);

      if (
        stockopnameResponse &&
        stockopnameResponse.data &&
        Array.isArray(stockopnameResponse.data) &&
        productsResponse &&
        productsResponse.data
      ) {
        const productMap = new Map(
          productsResponse.data.map((product) => [product.id, product.name]),
        );
        const updatedTableData = stockopnameResponse.data.map((stockopname) => ({
          ...stockopname,
          items: stockopname.items.map((item) => ({
            ...item,
            productName: productMap.get(item.productId) || 'Unknown Product', // Access product name with item.productId
          })),
        }));

        setTotalItems(stockopnameResponse.meta?.totalItems || 0); // Ensure totalItems comes from response meta data
        setTotalPages(Math.ceil(stockopnameResponse.meta?.totalItems / itemsPerPage)); // Calculate total pages based on totalItems
        console.log('Updated Table Data:', updatedTableData);

        setTableData(updatedTableData);
      } else {
        console.error(
          'Unexpected response format for inventories or products:',
          stockopnameResponse,
        );
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching inventories or products:', error);
      toast.error('Failed to fetch inventories');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);

  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    // Implement delete logic here
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    page: number,
  ) => {
    setCurrentPage(page + 1); // Adjust for 1-based page number
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateStockOpnameButton />
      </Box>
      <StockOpnameTable
        tableData={tableData}
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePageChange={handlePageChange} // Pass the updated handlePageChange function
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleEdit={() => {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default StockOpnamePage;
