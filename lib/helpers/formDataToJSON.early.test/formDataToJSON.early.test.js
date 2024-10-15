
// Unit tests for: formDataToJSON


import formDataToJSON from '../formDataToJSON';


describe('formDataToJSON() formDataToJSON method', () => {
  let formData;

  beforeEach(() => {
    // Reset formData before each test
    formData = new FormData();
  });

  describe('Happy Path', () => {
    test('should convert simple key-value pairs to JSON object', () => {
      formData.append('name', 'John Doe');
      formData.append('age', '30');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        name: 'John Doe',
        age: '30',
      });
    });

    test('should handle nested keys correctly', () => {
      formData.append('user[name]', 'John Doe');
      formData.append('user[age]', '30');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        user: {
          name: 'John Doe',
          age: '30',
        },
      });
    });

    test('should handle array-like keys correctly', () => {
      formData.append('items[0]', 'item1');
      formData.append('items[1]', 'item2');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        items: {
          0: 'item1',
          1: 'item2',
        },
      });
    });

    test('should handle keys with empty brackets', () => {
      formData.append('items[]', 'item1');
      formData.append('items[]', 'item2');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        items: ['item1', 'item2'],
      });
    });

    test('should handle mixed keys correctly', () => {
      formData.append('user[name]', 'John Doe');
      formData.append('user[age]', '30');
      formData.append('user[items][]', 'item1');
      formData.append('user[items][]', 'item2');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        user: {
          name: 'John Doe',
          age: '30',
          items: ['item1', 'item2'],
        },
      });
    });
  });

  describe('Edge Cases', () => {
    test('should return null for non-FormData input', () => {
      const result = formDataToJSON({});
      expect(result).toBeNull();
    });

    test('should return null for FormData without entries method', () => {
      const invalidFormData = {
        append: jest.fn(),
      };
      const result = formDataToJSON(invalidFormData);
      expect(result).toBeNull();
    });

    test('should handle keys with special characters', () => {
      formData.append('user@name', 'John Doe');
      formData.append('user#age', '30');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        'user@name': 'John Doe',
        'user#age': '30',
      });
    });

    test('should handle duplicate keys correctly', () => {
      formData.append('user[name]', 'John Doe');
      formData.append('user[name]', 'Jane Doe');

      const result = formDataToJSON(formData);
      expect(result).toEqual({
        user: {
          name: ['John Doe', 'Jane Doe'],
        },
      });
    });

    test('should handle empty FormData', () => {
      const result = formDataToJSON(formData);
      expect(result).toEqual({});
    });

    test('should ignore __proto__ keys', () => {
      formData.append('__proto__', 'malicious');

      const result = formDataToJSON(formData);
      expect(result).not.toHaveProperty('__proto__');
    });
  });
});

// End of unit tests for: formDataToJSON
