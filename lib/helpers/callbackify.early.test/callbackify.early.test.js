
// Unit tests for: callbackify


import utils from "../../utils.js";
import callbackify from '../callbackify';


jest.mock("../../utils.js");

describe('callbackify() callbackify method', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    utils.isAsyncFn.mockReset();
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return the original function if it is not an async function', () => {
      const syncFn = jest.fn((arg1, arg2) => arg1 + arg2);
      utils.isAsyncFn.mockReturnValue(false);
      
      const result = callbackify(syncFn);
      expect(result).toBe(syncFn);
    });

    it('should call the callback with the resolved value of the async function', async () => {
      const asyncFn = jest.fn().mockResolvedValue(42);
      const cb = jest.fn();
      utils.isAsyncFn.mockReturnValue(true);
      
      const callbackifiedFn = callbackify(asyncFn);
      await callbackifiedFn(1, 2, cb);
      
      expect(asyncFn).toHaveBeenCalledWith(1, 2);
      expect(cb).toHaveBeenCalledWith(null, 42);
    });

    it('should call the callback with the transformed value using the reducer', async () => {
      const asyncFn = jest.fn().mockResolvedValue(42);
      const reducer = jest.fn(value => [value * 2]);
      const cb = jest.fn();
      utils.isAsyncFn.mockReturnValue(true);
      
      const callbackifiedFn = callbackify(asyncFn, reducer);
      await callbackifiedFn(1, 2, cb);
      
      expect(asyncFn).toHaveBeenCalledWith(1, 2);
      expect(cb).toHaveBeenCalledWith(null, 84);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should call the callback with an error if the async function rejects', async () => {
      const asyncFn = jest.fn().mockRejectedValue(new Error('Async error'));
      const cb = jest.fn();
      utils.isAsyncFn.mockReturnValue(true);
      
      const callbackifiedFn = callbackify(asyncFn);
      await callbackifiedFn(1, 2, cb);
      
      expect(asyncFn).toHaveBeenCalledWith(1, 2);
      expect(cb).toHaveBeenCalledWith(new Error('Async error'));
    });

    it('should call the callback with an error if the reducer throws', async () => {
      const asyncFn = jest.fn().mockResolvedValue(42);
      const reducer = jest.fn(() => { throw new Error('Reducer error'); });
      const cb = jest.fn();
      utils.isAsyncFn.mockReturnValue(true);
      
      const callbackifiedFn = callbackify(asyncFn, reducer);
      await callbackifiedFn(1, 2, cb);
      
      expect(asyncFn).toHaveBeenCalledWith(1, 2);
      expect(cb).toHaveBeenCalledWith(new Error('Reducer error'));
    });

    it('should handle no arguments gracefully', async () => {
      const asyncFn = jest.fn().mockResolvedValue(42);
      const cb = jest.fn();
      utils.isAsyncFn.mockReturnValue(true);
      
      const callbackifiedFn = callbackify(asyncFn);
      await callbackifiedFn(cb);
      
      expect(asyncFn).toHaveBeenCalledWith();
      expect(cb).toHaveBeenCalledWith(null, 42);
    });

    it('should handle empty reducer gracefully', async () => {
      const asyncFn = jest.fn().mockResolvedValue(42);
      const cb = jest.fn();
      utils.isAsyncFn.mockReturnValue(true);
      
      const callbackifiedFn = callbackify(asyncFn, null);
      await callbackifiedFn(1, 2, cb);
      
      expect(asyncFn).toHaveBeenCalledWith(1, 2);
      expect(cb).toHaveBeenCalledWith(null, 42);
    });
  });
});

// End of unit tests for: callbackify
