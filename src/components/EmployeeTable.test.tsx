import { render, screen } from '@testing-library/react';
import EmployeeTable from './EmployeeTable';
import '@testing-library/jest-dom';

const testData = [
  { emp1: '1', emp2: '2', projectId: 'P1', days: 10 },
  { emp1: '3', emp2: '4', projectId: 'P2', days: 5 },
];

describe('EmployeeTable', () => {
  it('renders the table with data rows', () => {
    render(<EmployeeTable data={testData} isLoading={false} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('Employee ID #1')).toBeInTheDocument();
    expect(screen.getByText('Employee ID #2')).toBeInTheDocument();
    expect(screen.getByText('Project ID')).toBeInTheDocument();
    expect(screen.getByText('Days Worked')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders no rows message when data is empty', () => {
    render(<EmployeeTable data={[]} isLoading={false} />);
    expect(screen.getByText(/No rows/i)).toBeInTheDocument();
  });
});
