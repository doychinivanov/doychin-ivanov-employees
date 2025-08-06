import { calculatePairs } from './employeePairing';
import type { CSVRecord } from '../types/csvRecordType';

jest.mock('./dateParser', () => ({
  parseDate: (input: string) => {
    const map: Record<string, Date> = {
      '2023-01-01': new Date(2023, 0, 1),
      '2023-01-10': new Date(2023, 0, 10),
      '2023-01-05': new Date(2023, 0, 5),
      '2023-01-20': new Date(2023, 0, 20),
      'NULL': new Date(),
      '': new Date(),
    };
    return map[input] || new Date(input);
  }
}));

describe('calculatePairs', () => {
  it('calculates overlapping days correctly', () => {
    const records: CSVRecord[] = [
      { EmpID: '1', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-10' },
      { EmpID: '2', ProjectID: 'P1', DateFrom: '2023-01-05', DateTo: '2023-01-20' },
    ];

    const result = calculatePairs(records);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      emp1: '1',
      emp2: '2',
      projectId: 'P1',
      days: 6,
    });
  });

  it('returns empty array if no overlaps', () => {
    const records: CSVRecord[] = [
      { EmpID: '1', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-02' },
      { EmpID: '2', ProjectID: 'P1', DateFrom: '2023-01-03', DateTo: '2023-01-04' },
    ];

    const result = calculatePairs(records);

    expect(result).toEqual([]);
  });

  it('sorts results by days descending', () => {
    const records: CSVRecord[] = [
      { EmpID: '1', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-10' },
      { EmpID: '2', ProjectID: 'P1', DateFrom: '2023-01-05', DateTo: '2023-01-06' },
      { EmpID: '3', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-03' },
    ];

    const result = calculatePairs(records);

    expect(result.length).toBe(2);
    expect(result[0].days).toBeGreaterThanOrEqual(result[1].days);
  });

  it('handles multiple projects independently', () => {
    const records: CSVRecord[] = [
      { EmpID: '1', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-10' },
      { EmpID: '2', ProjectID: 'P1', DateFrom: '2023-01-05', DateTo: '2023-01-20' },
      { EmpID: '1', ProjectID: 'P2', DateFrom: '2023-01-01', DateTo: '2023-01-03' },
      { EmpID: '3', ProjectID: 'P2', DateFrom: '2023-01-02', DateTo: '2023-01-04' },
    ];

    const result = calculatePairs(records);

    expect(result).toHaveLength(2);

    const p1Pair = result.find(r => r.projectId === 'P1');
    const p2Pair = result.find(r => r.projectId === 'P2');

    expect(p1Pair).toBeDefined();
    expect(p2Pair).toBeDefined();

    expect(p1Pair?.days).toBe(6);
    expect(p2Pair?.days).toBe(2);
  });

  it('always orders emp1 < emp2', () => {
    const records: CSVRecord[] = [
      { EmpID: 'B', ProjectID: 'P1', DateFrom: '2023-01-01', DateTo: '2023-01-10' },
      { EmpID: 'A', ProjectID: 'P1', DateFrom: '2023-01-05', DateTo: '2023-01-20' },
    ];

    const result = calculatePairs(records);

    expect(result[0].emp1 < result[0].emp2).toBe(true);
    expect(result[0].emp1).toBe('A');
    expect(result[0].emp2).toBe('B');
  });
});
