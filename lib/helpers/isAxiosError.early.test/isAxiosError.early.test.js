
// Unit tests for: isAxiosError


import isAxiosError from '../isAxiosError';


'use strict';
describe('isAxiosError() isAxiosError method', () => {
  // Happy Path Tests
  test('should return true for a valid Axios error object', () => {
    // This test checks if the function correctly identifies a valid Axios error.
    const axiosError = { isAxiosError: true };
    expect(isAxiosError(axiosError)).toBe(true);
  });

  test('should return true for a valid Axios error object with additional properties', () => {
    // This test checks if the function correctly identifies a valid Axios error with extra properties.
    const axiosError = { isAxiosError: true, message: 'Error occurred', code: 500 };
    expect(isAxiosError(axiosError)).toBe(true);
  });

  // Edge Case Tests
  test('should return false for a non-object payload', () => {
    // This test checks if the function returns false for non-object types.
    expect(isAxiosError(null)).toBe(false);
    expect(isAxiosError(undefined)).toBe(false);
    expect(isAxiosError(42)).toBe(false);
    expect(isAxiosError('string')).toBe(false);
    expect(isAxiosError(true)).toBe(false);
    expect(isAxiosError([])).toBe(false); // Array is also an object but should return false
  });

  test('should return false for an object without isAxiosError property', () => {
    // This test checks if the function returns false for objects that do not have the isAxiosError property.
    const errorObj = { message: 'Some error' };
    expect(isAxiosError(errorObj)).toBe(false);
  });

  test('should return false for an object with isAxiosError property set to false', () => {
    // This test checks if the function returns false for objects with isAxiosError explicitly set to false.
    const errorObj = { isAxiosError: false };
    expect(isAxiosError(errorObj)).toBe(false);
  });

  test('should return false for an object with isAxiosError property set to a non-boolean value', () => {
    // This test checks if the function returns false for objects with isAxiosError set to a non-boolean value.
    const errorObj = { isAxiosError: 'not a boolean' };
    expect(isAxiosError(errorObj)).toBe(false);
  });

  test('should return false for an empty object', () => {
    // This test checks if the function returns false for an empty object.
    const emptyObj = {};
    expect(isAxiosError(emptyObj)).toBe(false);
  });
});

// End of unit tests for: isAxiosError
