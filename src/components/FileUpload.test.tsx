import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from './FileUpload';
import * as csvParser from '../utils/csvParser';
import * as employeePairing from '../utils/employeePairing';
import '@testing-library/jest-dom';

jest.mock('../utils/csvParser');
jest.mock('../utils/employeePairing');

describe('FileUpload', () => {
  const mockSetIsLoading = jest.fn();
  const mockSetError = jest.fn();
  const mockSetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the upload button with correct text when empty', () => {
    render(
      <FileUpload
        isEmpty={true}
        setIsLoading={mockSetIsLoading}
        setError={mockSetError}
        setData={mockSetData}
        error={null}
      />
    );
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

  it('renders the upload button with "Upload Another" when not empty', () => {
    render(
      <FileUpload
        isEmpty={false}
        setIsLoading={mockSetIsLoading}
        setError={mockSetError}
        setData={mockSetData}
        error={null}
      />
    );
    expect(screen.getByText('Upload Another')).toBeInTheDocument();
  });

  it('accepts only csv files and shows error for wrong type', () => {
    render(
      <FileUpload
        isEmpty={true}
        setIsLoading={mockSetIsLoading}
        setError={mockSetError}
        setData={mockSetData}
        error={null}
      />
    );
    const input = screen.getByLabelText(/upload csv/i) as HTMLInputElement;
    const file = new File(['not csv content'], 'file.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockSetError).toHaveBeenCalledWith('Only .csv files are allowed.');
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it('calls parseCSV and calculatePairs on valid csv file upload', async () => {
    const fakeCSV = 'some,csv,content';
    const parsedMock = [{ EmpID: '1', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-02' }];
    const pairsMock = [{ emp1: '1', emp2: '2', projectId: 'P1', days: 5 }];
    (csvParser.parseCSV as jest.Mock).mockReturnValue(parsedMock);
    (employeePairing.calculatePairs as jest.Mock).mockReturnValue(pairsMock);

    const mockFileReaderInstance = {
      onload: null as ((e: ProgressEvent<FileReader>) => void) | null,
      readAsText: jest.fn(function (this: any) {
        if (this.onload) {
          this.onload({ target: { result: fakeCSV } } as any);
        }
      }),
    };
    // @ts-ignore
    window.FileReader = jest.fn(() => mockFileReaderInstance);

    render(
      <FileUpload
        isEmpty={true}
        setIsLoading={mockSetIsLoading}
        setError={mockSetError}
        setData={mockSetData}
        error={null}
      />
    );
    const input = screen.getByLabelText(/upload csv/i) as HTMLInputElement;
    const file = new File([fakeCSV], 'file.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      expect(mockSetError).toHaveBeenCalledWith(null);
      expect(csvParser.parseCSV).toHaveBeenCalledWith(fakeCSV);
      expect(employeePairing.calculatePairs).toHaveBeenCalledWith(parsedMock);
      expect(mockSetData).toHaveBeenCalledWith(pairsMock);
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it('sets error if parseCSV throws', async () => {
    const errorMsg = 'Parse error';
    (csvParser.parseCSV as jest.Mock).mockImplementation(() => {
      throw new Error(errorMsg);
    });

    const badCSV = 'bad content';
    const mockFileReaderInstance = {
      onload: null as ((e: ProgressEvent<FileReader>) => void) | null,
      readAsText: jest.fn(function (this: any) {
        if (this.onload) {
          this.onload({ target: { result: badCSV } } as any);
        }
      }),
    };
    // @ts-ignore
    window.FileReader = jest.fn(() => mockFileReaderInstance);

    render(
      <FileUpload
        isEmpty={true}
        setIsLoading={mockSetIsLoading}
        setError={mockSetError}
        setData={mockSetData}
        error={null}
      />
    );
    const input = screen.getByLabelText(/upload csv/i) as HTMLInputElement;
    const file = new File([badCSV], 'file.csv', { type: 'text/csv' });
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(errorMsg);
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });
});
