import type { CSVRecord } from '../types/csvRecordType';
import type { ResultRow } from '../types/tableFormatType';
import { parseDate } from './dateParser';

export function calculatePairs(records: CSVRecord[]): ResultRow[] {
  const projects = new Map<string, CSVRecord[]>();

  for (const rec of records) {
    if (!projects.has(rec.ProjectID)) {
      projects.set(rec.ProjectID, []);
    }
    projects.get(rec.ProjectID)!.push(rec);
  }

  const result: ResultRow[] = [];

  for (const [projectId, empRecords] of projects) {
    for (let i = 0; i < empRecords.length; i++) {
      for (let j = i + 1; j < empRecords.length; j++) {
        const empA = empRecords[i];
        const empB = empRecords[j];

        const dateFromA = parseDate(empA.DateFrom);
        const dateToA = parseDate(empA.DateTo);
        const dateFromB = parseDate(empB.DateFrom);
        const dateToB = parseDate(empB.DateTo);

        const overlapStart = new Date(Math.max(dateFromA.getTime(), dateFromB.getTime()));
        const overlapEnd = new Date(Math.min(dateToA.getTime(), dateToB.getTime()));

        if (overlapStart <= overlapEnd) {
          const days = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

          result.push({
            emp1: empA.EmpID < empB.EmpID ? empA.EmpID : empB.EmpID,
            emp2: empA.EmpID < empB.EmpID ? empB.EmpID : empA.EmpID,
            projectId,
            days,
          });
        }
      }
    }
  }

  result.sort((a, b) => b.days - a.days);
  return result;
}
