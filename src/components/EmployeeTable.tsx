import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { ResultRow } from '../types/tableFormatType';

interface EmployeeTableProps {
  data: ResultRow[];
  isLoading: boolean
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, isLoading }) => {
  const columns: GridColDef[] = [
    { field: 'emp1', headerName: 'Employee ID #1', flex: 1 },
    { field: 'emp2', headerName: 'Employee ID #2', flex: 1 },
    { field: 'projectId', headerName: 'Project ID', flex: 1 },
    { field: 'days', headerName: 'Days Worked', flex: 1 },
  ];

  const rowsWithId = data.map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <Box sx={{ height: 520, width: '100%', maxWidth: { xs: 300, sm: 500, lg: 1000 } , mx: 'auto' }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        loading={isLoading}
        rowHeight={38}
        disableRowSelectionOnClick
        sx={{
          backgroundColor: '#2c2c2c',
          color: '#e0e0e0',
          border: '1px solid #444',

          '.MuiDataGrid-columnHeaders': {
            backgroundColor: '#2c2c2c',
            borderBottom: '1px solid #555',
          },

          '.MuiDataGrid-columnHeader': {
            backgroundColor: '#2c2c2c !important',
            color: '#e0e0e0',
          },

          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },

          '.MuiDataGrid-cell': {
            backgroundColor: '#2c2c2c',
            borderBottom: '1px solid #333',
          },

          '.MuiDataGrid-row:hover': {
            backgroundColor: '#383838',
          },

          '.MuiDataGrid-footerContainer': {
            backgroundColor: '#2c2c2c',
            color: '#e0e0e0',
            borderTop: '1px solid #444',
          },

          '.MuiTablePagination-root': {
            color: '#e0e0e0',
          },

          '.MuiDataGrid-selectedRowCount': {
            color: '#aaa',
          },

          '.MuiDataGrid-virtualScroller': {
            backgroundColor: '#2c2c2c',
          },

          '.MuiDataGrid-overlay': {
            backgroundColor: '#2c2c2c',
            color: '#888',
          },
          '.MuiDataGrid-sortIcon': {
            color: '#e0e0e0',
          }
        }}
      />
    </Box>
  );
};

export default EmployeeTable;
