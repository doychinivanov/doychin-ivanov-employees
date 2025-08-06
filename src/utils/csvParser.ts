import * as Papa from 'papaparse';
import type { CSVRecord } from '../types/csvRecordType';

export const parseCSV = (content: string): CSVRecord[] => {
  const result = Papa.parse<CSVRecord>(content, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length > 0) {
    throw new Error(`CSV parse error: ${result.errors[0].message}`);
  }

  if (!result.data || result.data.length === 0) {
    throw new Error('CSV file is empty or contains no valid data.');
  }

  return result.data;
}
