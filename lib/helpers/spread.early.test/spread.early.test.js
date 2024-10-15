
// Unit tests for: spread



import spread from '../spread';



describe('spread() spread method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should correctly invoke a function with an array of arguments', () => {
      // This test checks if the function is called with the correct arguments
      const mockCallback = jest.fn();
      const args = [1, 2, 3];
      const spreadFunction = spread(mockCallback);
      
      spreadFunction(args);
      
      expect(mockCallback).toHaveBeenCalledWith(1, 2, 3);
    });

    it('should handle an empty array of arguments', () => {
      // This test checks if the function can handle an empty array
      const mockCallback = jest.fn();
      const args = [];
      const spreadFunction = spread(mockCallback);
      
      spreadFunction(args);
      
      expect(mockCallback).toHaveBeenCalledWith();
    });

    it('should correctly invoke a function with a single argument', () => {
      // This test checks if the function is called with a single argument
      const mockCallback = jest.fn();
      const args = [42];
      const spreadFunction = spread(mockCallback);
      
      spreadFunction(args);
      
      expect(mockCallback).toHaveBeenCalledWith(42);
    });

    it('should correctly invoke a function with multiple arguments of different types', () => {
      // This test checks if the function can handle different types of arguments
      const mockCallback = jest.fn();
      const args = [1, 'two', { three: 3 }];
      const spreadFunction = spread(mockCallback);
      
      spreadFunction(args);
      
      expect(mockCallback).toHaveBeenCalledWith(1, 'two', { three: 3 });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle non-array input gracefully', () => {
      // This test checks if the function can handle non-array inputs
      const mockCallback = jest.fn();
      const spreadFunction = spread(mockCallback);
      
      // Using a non-array input
      expect(() => spreadFunction(null)).toThrow();
      expect(() => spreadFunction(undefined)).toThrow();
      expect(() => spreadFunction(123)).toThrow();
      expect(() => spreadFunction('string')).toThrow();
    });

    it('should handle nested arrays correctly', () => {
      // This test checks if the function can handle nested arrays
      const mockCallback = jest.fn();
      const args = [[1, 2], [3, 4]];
      const spreadFunction = spread(mockCallback);
      
      // Flattening the nested array before passing it to the callback
      spreadFunction([].concat(...args));
      
      expect(mockCallback).toHaveBeenCalledWith(1, 2, 3, 4);
    });

    it('should handle large arrays of arguments', () => {
      // This test checks if the function can handle a large number of arguments
      const mockCallback = jest.fn();
      const args = Array.from({ length: 1000 }, (_, i) => i + 1);
      const spreadFunction = spread(mockCallback);
      
      spreadFunction(args);
      
      expect(mockCallback).toHaveBeenCalledWith(...args);
    });
  });
});

// End of unit tests for: spread
