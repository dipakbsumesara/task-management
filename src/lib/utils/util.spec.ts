// util.test.js
import { objectCopy, sendApiResponse, formatDate } from './util';

describe('Utility Functions', () => {
  // Test for objectCopy
  describe('objectCopy', () => {
    it('should create a deep copy of the object', () => {
      const obj = { a: 1, b: { c: 2 } };
      const copiedObj = objectCopy(obj);
      expect(copiedObj).toEqual(obj);
      expect(copiedObj).not.toBe(obj);
      expect(copiedObj.b).toEqual(obj.b);
      expect(copiedObj.b).not.toBe(obj.b);
    });
  });

  // Test for sendApiResponse
  describe('sendApiResponse', () => {
    it('should return a success status and the provided message and data', () => {
      const response = sendApiResponse('Operation successful', { id: 1 });
      expect(response).toEqual({
        status: 'success',
        message: 'Operation successful',
        data: { id: 1 }
      });
    });

    it('should return a success status and message without data if no data is provided', () => {
      const response = sendApiResponse('No data provided');
      expect(response).toEqual({
        status: 'success',
        message: 'No data provided'
      });
    });
  });

  // Test for formatDate
  describe('formatDate', () => {
    it('should format the ISO date string into a readable format', () => {
      const isoDate = '2020-01-01T12:00:00Z';
      const formatted = formatDate(isoDate);
      // Note: The output format can vary depending on the environment locale, this test might need adjustment.
      expect(formatted).toBe('Wednesday, January 1, 2020, 12:00 PM');
    });
  });
});
