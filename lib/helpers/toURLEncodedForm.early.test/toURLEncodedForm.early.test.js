
// Unit tests for: toURLEncodedForm


import platform from '../../platform/index.js';
import utils from '../../utils.js';
import toFormData from '../toFormData.js';
import toURLEncodedForm from '../toURLEncodedForm';


'use strict';
jest.mock("../toFormData.js", () => {
  const originalModule = jest.requireActual("../toFormData.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
  };
});

describe('toURLEncodedForm() toURLEncodedForm method', () => {
  const mockToFormData = toFormData;

  beforeEach(() => {
    // Clear all instances and calls to the mock function
    mockToFormData.mockClear();
  });

  describe('Happy Path', () => {
    it('should convert a simple object to URL encoded form', () => {
      const data = { name: 'John', age: 30 };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('name', 'John');
      expectedParams.append('age', '30');

      mockToFormData.mockReturnValue(expectedParams);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });

    it('should handle nested objects correctly', () => {
      const data = { user: { name: 'Jane', age: 25 } };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('user[name]', 'Jane');
      expectedParams.append('user[age]', '25');

      mockToFormData.mockReturnValue(expectedParams);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });

    it('should handle arrays correctly', () => {
      const data = { tags: ['js', 'jest', 'testing'] };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('tags[]', 'js');
      expectedParams.append('tags[]', 'jest');
      expectedParams.append('tags[]', 'testing');

      mockToFormData.mockReturnValue(expectedParams);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty objects', () => {
      const data = {};
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();

      mockToFormData.mockReturnValue(expectedParams);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });

    it('should handle null values', () => {
      const data = { name: null };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('name', '');

      mockToFormData.mockReturnValue(expectedParams);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });

    it('should handle undefined values', () => {
      const data = { name: undefined };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('name', '');

      mockToFormData.mockReturnValue(expectedParams);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });

    it('should handle Buffer values in Node.js environment', () => {
      const data = { file: Buffer.from('test') };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('file', 'dGVzdA=='); // base64 encoded

      mockToFormData.mockReturnValue(expectedParams);
      platform.isNode = true; // Simulate Node.js environment
      utils.isBuffer = jest.fn().mockReturnValue(true);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });

    it('should call defaultVisitor for non-Buffer values', () => {
      const data = { name: 'Alice' };
      const options = {};
      const expectedParams = new platform.classes.URLSearchParams();
      expectedParams.append('name', 'Alice');

      mockToFormData.mockReturnValue(expectedParams);
      platform.isNode = true; // Simulate Node.js environment
      utils.isBuffer = jest.fn().mockReturnValue(false);

      const result = toURLEncodedForm(data, options);

//      expect(mockToFormData).toHaveBeenCalledWith(data, expect.any(platform.classes.URLSearchParams), expect.any(Object));
      expect(result).toEqual(expectedParams);
    });
  });
});

// End of unit tests for: toURLEncodedForm
