import { useState } from 'react';
import './App.css'
import FileUpload from './components/FileUpload'
import EmployeeTable from './components/EmployeeTable';
import type { ResultRow } from './types/tableFormatType';
import MainButton from './components/MainButton';
import { ButtonWrapper } from './components/ButtonWrapper';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import FixedAlert from './components/Alert';

function App() {
  const [data, setData] = useState<ResultRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const clearTableData = () => setData([]);

  return (
    <>
      {error && <FixedAlert message={error} />}

      <div style={{ padding: '2rem', width: '100%' }}>
        <h1>Employee Pair Finder</h1>
        <EmployeeTable data={data} isLoading={isLoading} />

        <ButtonWrapper>
          <FileUpload isEmpty={data.length === 0} setIsLoading={setIsLoading} error={error} setError={setError} setData={setData} />
          {data.length > 0 && <MainButton text='Clear Table' onClick={clearTableData} icon={<DeleteIcon />} />}
        </ButtonWrapper>
      </div>
    </>
  )
}

export default App
