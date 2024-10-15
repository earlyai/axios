
// Unit tests for: assertOptions


import AxiosError from '../../core/AxiosError.js';
import { assertOptions, validators } from '../validator';


describe('assertOptions() assertOptions method', () => {
  const schema = {
    name: validators.string,
    age: validators.number,
    active: validators.boolean,
  };

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should validate options correctly when all properties are valid', () => {
      const options = { name: 'John', age: 30, active: true };
      expect(() => assertOptions(options, schema)).not.toThrow();
    });

    it('should allow unknown properties when allowUnknown is true', () => {
      const options = { name: 'John', age: 30, active: true, unknownProp: 'value' };
      expect(() => assertOptions(options, schema, true)).not.toThrow();
    });

    it('should validate options correctly when some properties are optional', () => {
      const options = { name: 'John' };
      expect(() => assertOptions(options, schema)).not.toThrow();
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should throw an error if options is not an object', () => {
      const options = 'not an object';
      expect(() => assertOptions(options, schema)).toThrow(AxiosError);
      expect(() => assertOptions(options, schema)).toThrow('options must be an object');
    });

    it('should throw an error if an unknown option is provided and allowUnknown is false', () => {
      const options = { name: 'John', unknownProp: 'value' };
      expect(() => assertOptions(options, schema)).toThrow(AxiosError);
      expect(() => assertOptions(options, schema)).toThrow('Unknown option unknownProp');
    });

    it('should throw an error if a property fails validation', () => {
      const options = { name: 'John', age: 'not a number' };
      expect(() => assertOptions(options, schema)).toThrow(AxiosError);
      expect(() => assertOptions(options, schema)).toThrow('option age must be a number');
    });

    it('should throw an error if a required property is missing', () => {
      const options = { age: 30 };
      expect(() => assertOptions(options, schema)).toThrow(AxiosError);
      expect(() => assertOptions(options, schema)).toThrow('option name must be a string');
    });

    it('should handle empty options object without throwing an error', () => {
      const options = {};
      expect(() => assertOptions(options, schema)).not.toThrow();
    });

    it('should throw an error if a property is of the wrong type', () => {
      const options = { name: 'John', age: 30, active: 'not a boolean' };
      expect(() => assertOptions(options, schema)).toThrow(AxiosError);
      expect(() => assertOptions(options, schema)).toThrow('option active must be a boolean');
    });
  });
});

// End of unit tests for: assertOptions
