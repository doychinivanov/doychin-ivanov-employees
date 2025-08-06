export const parseDate = (input: string): Date => {
  if (!input || input === 'NULL') return new Date();

  const formats = [
    'yyyy-MM-dd',
    'MM/dd/yyyy',
    'dd/MM/yyyy',
    'dd-MM-yyyy',
  ];

  const candidates = formats
    .map(fmt => ({ fmt, date: tryParse(input, fmt) }))
    .filter(({ date }) => date !== null) as { fmt: string; date: Date }[];

  if (candidates.length === 0) {
    throw new Error(`Unrecognized date format: ${input}`);
  }

  if (candidates.length === 1) {
    return candidates[0].date;
  }

  const parts = input.match(/\d+/g)?.map(Number);
  if (!parts) throw new Error(`Unrecognized date format: ${input}`);

  if (parts[0] > 12 && parts[1] <= 12) {
    const candidate = candidates.find(c => c.fmt === 'dd/MM/yyyy');
    if (candidate) return candidate.date;
  }

  if (parts[1] > 12 && parts[0] <= 12) {
    const candidate = candidates.find(c => c.fmt === 'MM/dd/yyyy');
    if (candidate) return candidate.date;
  }

  const mmddCandidate = candidates.find(c => c.fmt === 'MM/dd/yyyy');
  if (mmddCandidate) return mmddCandidate.date;

  return candidates[0].date;
}



const tryParse = (dateStr: string, format: string): Date | null => {
  let regex;
  switch (format) {
    case 'yyyy-MM-dd':
      regex = /^\d{4}-\d{2}-\d{2}$/;
      break;
    case 'dd/MM/yyyy':
    case 'dd-MM-yyyy':
      regex = /^\d{2}[\/-]\d{2}[\/-]\d{4}$/;
      break;
    case 'MM/dd/yyyy':
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      break;
    default:
      return null;
  }

  if (!regex.test(dateStr)) return null;

  const parts = dateStr.match(/\d+/g);
  if (!parts) return null;

  let year = 0, month = 0, day = 0;

  switch (format) {
    case 'yyyy-MM-dd':
      [year, month, day] = parts.map(Number);
      break;
    case 'MM/dd/yyyy':
      [month, day, year] = parts.map(Number);
      break;
    case 'dd-MM-yyyy':
    case 'dd/MM/yyyy':
      [day, month, year] = parts.map(Number);
      break;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

