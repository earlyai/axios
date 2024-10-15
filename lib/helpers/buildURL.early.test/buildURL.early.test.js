
// Unit tests for: buildURL


import AxiosURLSearchParams from '../../helpers/AxiosURLSearchParams.js';
import buildURL from '../buildURL';


jest.mock("../../utils.js");
jest.mock("../../helpers/AxiosURLSearchParams.js");

describe('buildURL() buildURL method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return the base URL when no params are provided', () => {
      // Test description: Ensure that the function returns the base URL when no parameters are passed.
      const url = 'http://www.example.com';
      const result = buildURL(url);
      expect(result).toBe(url);
    });

    it('should append parameters to the URL correctly', () => {
      // Test description: Ensure that parameters are appended correctly to the base URL.
      const url = 'http://www.example.com';
      const params = { key1: 'value1', key2: 'value2' };
      const expectedUrl = 'http://www.example.com?key1=value1&key2=value2';
      
      AxiosURLSearchParams.mockImplementation(() => ({
        toString: jest.fn(() => 'key1=value1&key2=value2')
      }));

      const result = buildURL(url, params);
      expect(result).toBe(expectedUrl);
    });

    it('should handle URLs with existing query parameters', () => {
      // Test description: Ensure that parameters are appended correctly when the base URL already has query parameters.
      const url = 'http://www.example.com?existing=value';
      const params = { key1: 'value1' };
      const expectedUrl = 'http://www.example.com?existing=value&key1=value1';

      AxiosURLSearchParams.mockImplementation(() => ({
        toString: jest.fn(() => 'key1=value1')
      }));

      const result = buildURL(url, params);
      expect(result).toBe(expectedUrl);
    });

    it('should handle URLs with a hash fragment', () => {
      // Test description: Ensure that the hash fragment is removed before appending parameters.
      const url = 'http://www.example.com#fragment';
      const params = { key1: 'value1' };
      const expectedUrl = 'http://www.example.com?key1=value1';

      AxiosURLSearchParams.mockImplementation(() => ({
        toString: jest.fn(() => 'key1=value1')
      }));

      const result = buildURL(url, params);
      expect(result).toBe(expectedUrl);
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle empty parameter objects', () => {
      // Test description: Ensure that an empty parameter object does not alter the base URL.
      const url = 'http://www.example.com';
      const params = {};
      const result = buildURL(url, params);
      expect(result).toBe(url);
    });

    it('should handle null parameters', () => {
      // Test description: Ensure that null parameters do not alter the base URL.
      const url = 'http://www.example.com';
      const result = buildURL(url, null);
      expect(result).toBe(url);
    });

    it('should handle undefined parameters', () => {
      // Test description: Ensure that undefined parameters do not alter the base URL.
      const url = 'http://www.example.com';
      const result = buildURL(url, undefined);
      expect(result).toBe(url);
    });

    it('should handle special characters in parameters', () => {
      // Test description: Ensure that special characters are encoded correctly in parameters.
      const url = 'http://www.example.com';
      const params = { key: 'value with spaces & special characters: $,:[]' };
      const expectedUrl = 'http://www.example.com?key=value%20with%20spaces%20%26%20special%20characters%3A%20%24%2C%3A%5B%5D';

      AxiosURLSearchParams.mockImplementation(() => ({
        toString: jest.fn(() => 'key=value with spaces & special characters: $,:[]')
      }));

      const result = buildURL(url, params);
      expect(result).toBe(expectedUrl);
    });

    it('should use custom serialization function if provided', () => {
      // Test description: Ensure that a custom serialization function is used when provided in options.
      const url = 'http://www.example.com';
      const params = { key1: 'value1' };
      const expectedUrl = 'http://www.example.com?custom=value';

      const customSerialize = jest.fn(() => 'custom=value');
      const options = { serialize: customSerialize };

      const result = buildURL(url, params, options);
      expect(result).toBe(expectedUrl);
      expect(customSerialize).toHaveBeenCalledWith(params, options);
    });
  });
});

// End of unit tests for: buildURL
