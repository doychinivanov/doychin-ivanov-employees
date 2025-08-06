import { parseCSV } from './csvParser';

describe('parseCSV', () => {
    it('parses valid CSV content correctly', () => {
        const csvContent = `name,age,city
John,30,New York
Jane,25,London
`;
        const data = parseCSV(csvContent);

        expect(data).toEqual([
            { name: 'John', age: '30', city: 'New York' },
            { name: 'Jane', age: '25', city: 'London' },
        ]);
    });

    it('throws error on CSV parse error', () => {
        const malformedCsv = `name,age,city
John,30,"New York
Jane,25,London
`;

        expect(() => parseCSV(malformedCsv)).toThrow(/CSV parse error:/);
    });

    it('throws error if CSV has no data rows', () => {
        const emptyCsv = `name,age,city\n`;
        expect(() => parseCSV(emptyCsv)).toThrow('CSV file is empty or contains no valid data.');
    });
});
