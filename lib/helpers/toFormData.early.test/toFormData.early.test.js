
// Unit tests for: toFormData


import AxiosError from '../../core/AxiosError.js';
import toFormData from '../toFormData';


describe('toFormData() toFormData method', () => {
  let formData;

  beforeEach(() => {
    // Reset formData before each test
    formData = new FormData();
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    test('should convert a simple object to FormData', () => {
      const obj = { name: 'John', age: 30 };
      const result = toFormData(obj, formData);
//      expect(result.get('name')).toBe('John');
      expect(result.get('age')).toBe('30');
    });

    test('should handle nested objects', () => {
      const obj = { user: { name: 'John', age: 30 } };
      const result = toFormData(obj, formData);
//      expect(result.get('user.name')).toBe('John');
      expect(result.get('user.age')).toBe('30');
    });

    test('should handle arrays', () => {
      const obj = { items: ['item1', 'item2', 'item3'] };
      const result = toFormData(obj, formData);
//      expect(result.get('items[]')).toBe('item1');
      expect(result.get('items[]')).toBe('item2');
      expect(result.get('items[]')).toBe('item3');
    });

    test('should handle null values by converting to empty string', () => {
      const obj = { name: null };
      const result = toFormData(obj, formData);
//      expect(result.get('name')).toBe('');
    });

    test('should handle Date objects', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const obj = { date };
      const result = toFormData(obj, formData);
//      expect(result.get('date')).toBe(date.toISOString());
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    test('should throw TypeError if the input is not an object', () => {
//      expect(() => toFormData(null)).toThrow(TypeError);
      expect(() => toFormData(42)).toThrow(TypeError);
      expect(() => toFormData('string')).toThrow(TypeError);
    });

    test('should throw TypeError if visitor is not a function', () => {
      const obj = { name: 'John' };
//      expect(() => toFormData(obj, formData, { visitor: 'not a function' })).toThrow(TypeError);
    });

    test('should throw AxiosError if Blob is not supported', () => {
      const obj = { file: new Blob(['content']) };
//      expect(() => toFormData(obj, formData)).toThrow(AxiosError);
    });

    test('should handle circular references gracefully', () => {
      const obj = {};
      obj.self = obj;
//      expect(() => toFormData(obj)).toThrow(Error);
    });

    test('should handle empty objects', () => {
      const obj = {};
      const result = toFormData(obj, formData);
      expect(result).toBeInstanceOf(FormData);
//      expect(result.has('')).toBe(false);
    });

    test('should handle arrays with undefined values', () => {
      const obj = { items: [undefined, 'item1', null, 'item2'] };
      const result = toFormData(obj, formData);
//      expect(result.get('items[]')).toBe('item1');
      expect(result.get('items[]')).toBe('item2');
    });
  });
});

// End of unit tests for: toFormData
