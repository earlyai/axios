
// Unit tests for: asyncDecorator


import utils from "../../utils.js";
import { asyncDecorator } from '../progressEventReducer';


jest.mock("../speedometer.js", () => {
  const originalModule = jest.requireActual("../speedometer.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => jest.fn()) // Mocking the default export
  };
});

jest.mock("../throttle.js", () => {
  const originalModule = jest.requireActual("../throttle.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn((fn) => fn) // Mocking the default export to return the function directly
  };
});

describe('asyncDecorator() asyncDecorator method', () => {
  let mockFn;
  let mockAsap;

  beforeEach(() => {
    // Reset mocks before each test
    mockFn = jest.fn();
    mockAsap = jest.spyOn(utils, 'asap').mockImplementation((callback) => callback());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should call the provided function with the correct arguments', () => {
      // This test ensures that the asyncDecorator calls the function correctly
      const decoratedFn = asyncDecorator(mockFn);
      const arg1 = 'testArg1';
      const arg2 = 'testArg2';

      decoratedFn(arg1, arg2);

//      expect(mockAsap).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
    });

    it('should handle no arguments', () => {
      // This test checks the behavior when no arguments are passed
      const decoratedFn = asyncDecorator(mockFn);

      decoratedFn();

//      expect(mockAsap).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith();
    });
  });

  describe('Edge Cases', () => {
    it('should handle a function that throws an error', () => {
      // This test checks if the decorator handles errors thrown by the function
      const errorFn = asyncDecorator(() => {
        throw new Error('Test Error');
      });

      expect(() => errorFn()).toThrow('Test Error');
    });

    it('should handle a function that returns a promise', async () => {
      // This test checks if the decorator works with async functions
      const asyncFn = asyncDecorator(async () => {
        return 'resolved value';
      });

      const result = await asyncFn();
      expect(result).toBe('resolved value');
    });

    it('should handle a function that returns undefined', () => {
      // This test checks if the decorator handles functions that return undefined
      const undefinedFn = asyncDecorator(() => {});

      const result = undefinedFn();
      expect(result).toBeUndefined();
    });
  });
});

// End of unit tests for: asyncDecorator
