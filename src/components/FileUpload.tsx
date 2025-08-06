import React from 'react';
import Stack from '@mui/material/Stack';
import MainButton from './MainButton';
import UploadIcon from '@mui/icons-material/Upload';
import { parseCSV } from '../utils/csvParser';
import { calculatePairs } from '../utils/employeePairing';
import type { ResultRow } from '../types/tableFormatType';

interface FileUploadProps {
  isEmpty: boolean
  setIsLoading: (x: boolean) => void
  error: string | null
  setError: (x: string | null) => void
  setData: (data: ResultRow[]) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ isEmpty, setIsLoading, setError, setData }) => {
  const onFileLoaded = (csvContent: string) => {
    try {
      const parsed = parseCSV(csvContent);
      setData(calculatePairs(parsed));
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const isCSV = file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
    if (!isCSV) {
      setError('Only .csv files are allowed.');
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        onFileLoaded(text);
      }
      event.target.value = '';
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  return (
    <Stack spacing={2}>
      <div>
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="csv-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="csv-upload">
          <MainButton text={isEmpty ? 'Upload CSV' : 'Upload Another'} icon={<UploadIcon />} />
        </label>
      </div>
    </Stack>
  );
};

export default FileUpload;
