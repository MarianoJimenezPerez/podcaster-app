import { formatDate } from '../formatDate';
import { describe, it, expect } from 'vitest';

describe('formatDate.ts', () => {
  it('should return a date in format DD/MM/YYYY', () => {
    const inputDate = '2024-04-07';
    const expectedOutput = '07/04/2024';
    expect(formatDate(inputDate)).toEqual(expectedOutput);
  });
});
