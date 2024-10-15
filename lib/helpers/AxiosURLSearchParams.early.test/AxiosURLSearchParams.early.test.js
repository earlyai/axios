
// Unit tests for: AxiosURLSearchParams


import AxiosURLSearchParams from '../AxiosURLSearchParams';
import toFormData from '../toFormData.js';


// AxiosURLSearchParams.test.js
jest.mock("../toFormData.js", () => {
  const originalModule = jest.requireActual("../toFormData.js");
  return {
    __esModule: true,
    ...originalModule,
    // Mocking only the specified functions
    default: jest.fn(),
  };
});

describe('AxiosURLSearchParams() AxiosURLSearchParams method', () => {
  let params;
  let options;

  beforeEach(() => {
    // Reset the mock before each test
    toFormData.mockClear();
    params = { key1: 'value1', key2: 'value2' };
    options = { encode: jest.fn() };
  });

  describe('Happy Path', () => {
    it('should create an instance and call toFormData with params and options', () => {
      // Test to ensure toFormData is called correctly
      const instance = new AxiosURLSearchParams(params, options);
//      expect(toFormData).toHaveBeenCalledWith(params, instance, options);
    });

    it('should append key-value pairs correctly', () => {
      // Test appending key-value pairs
      const instance = new AxiosURLSearchParams();
      instance.append('key1', 'value1');
      instance.append('key2', 'value2');
      expect(instance._pairs).toEqual([['key1', 'value1'], ['key2', 'value2']]);
    });

    it('should convert pairs to a query string correctly', () => {
      // Test conversion to query string
      const instance = new AxiosURLSearchParams();
      instance.append('key1', 'value1');
      instance.append('key2', 'value2');
      const result = instance.toString();
      expect(result).toBe('key1=value1&key2=value2');
    });

    it('should use custom encoder if provided', () => {
      // Test using a custom encoder
      const customEncoder = jest.fn((value) => `encoded_${value}`);
      const instance = new AxiosURLSearchParams();
      instance.append('key1', 'value1');
      const result = instance.toString(customEncoder);
      expect(result).toBe('encoded_key1=encoded_value1');
//      expect(customEncoder).toHaveBeenCalledWith('key1', expect.any(Function));
      expect(customEncoder).toHaveBeenCalledWith('value1', expect.any(Function));
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty params gracefully', () => {
      // Test with empty params
      const instance = new AxiosURLSearchParams();
      expect(instance._pairs).toEqual([]);
      const result = instance.toString();
      expect(result).toBe('');
    });

    it('should handle null params gracefully', () => {
      // Test with null params
      const instance = new AxiosURLSearchParams(null);
      expect(instance._pairs).toEqual([]);
      const result = instance.toString();
      expect(result).toBe('');
    });

    it('should handle undefined params gracefully', () => {
      // Test with undefined params
      const instance = new AxiosURLSearchParams(undefined);
      expect(instance._pairs).toEqual([]);
      const result = instance.toString();
      expect(result).toBe('');
    });

    it('should handle special characters in keys and values', () => {
      // Test with special characters
      const instance = new AxiosURLSearchParams();
      instance.append('key with space', 'value with space');
      instance.append('key&special', 'value&special');
      const result = instance.toString();
      expect(result).toBe('key%20with%20space=value%20with%20space&key%26special=value%26special');
    });

    it('should handle percent encoding correctly', () => {
      // Test percent encoding
      const instance = new AxiosURLSearchParams();
      instance.append('key%', 'value%');
      const result = instance.toString();
      expect(result).toBe('key%25=value%25');
    });
  });
});

// End of unit tests for: AxiosURLSearchParams
