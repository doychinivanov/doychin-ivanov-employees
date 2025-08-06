import { parseDate } from './dateParser';

describe('parseDate', () => {
    it('parses yyyy-MM-dd format correctly', () => {
        const date = parseDate('2023-08-01');
        expect(date).toEqual(new Date(2023, 7, 1)); // Month is 0-indexed
    });

    it('parses MM/dd/yyyy format correctly', () => {
        const date = parseDate('08/01/2023');
        expect(date).toEqual(new Date(2023, 7, 1));
    });

    it('parses dd-MM-yyyy format correctly', () => {
        const date = parseDate('01-08-2023');
        expect(date).toEqual(new Date(2023, 7, 1));
    });

    it('returns today’s date when input is NULL', () => {
        const now = new Date();
        const parsed = parseDate('NULL');
        expect(parsed.toDateString()).toEqual(now.toDateString());
    });

    it('returns today’s date when input is empty string', () => {
        const now = new Date();
        const parsed = parseDate('');
        expect(parsed.toDateString()).toEqual(now.toDateString());
    });

    it('throws error on unrecognized format', () => {
        expect(() => parseDate('August 1, 2023')).toThrow('Unrecognized date format: August 1, 2023');
    });

    it('throws error on garbage input', () => {
        expect(() => parseDate('abc')).toThrow('Unrecognized date format: abc');
    });
});
