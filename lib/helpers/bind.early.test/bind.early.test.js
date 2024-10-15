
// Unit tests for: bind



import bind from '../bind';



describe('bind() bind method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should bind the function to the provided context', () => {
      // This test checks if the function is called with the correct context.
      const context = { value: 42 };
      const fn = function() {
        return this.value;
      };
      const boundFn = bind(fn, context);
      expect(boundFn()).toBe(42);
    });

    it('should pass arguments to the original function', () => {
      // This test checks if arguments are passed correctly.
      const context = { multiplier: 2 };
      const fn = function(a, b) {
        return this.multiplier * (a + b);
      };
      const boundFn = bind(fn, context);
      expect(boundFn(1, 2)).toBe(6); // 2 * (1 + 2)
    });

    it('should work with different types of functions', () => {
      // This test checks if the bind function works with arrow functions.
      const context = { greeting: 'Hello' };
      const fn = () => this.greeting; // Arrow function does not have its own 'this'
      const boundFn = bind(fn, context);
      expect(boundFn()).toBeUndefined(); // Arrow function does not bind 'this'
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle null as thisArg', () => {
      // This test checks if null is handled correctly as thisArg.
      const fn = function() {
        return this === null; // Should return true
      };
      const boundFn = bind(fn, null);
      expect(boundFn()).toBe(true);
    });

    it('should handle undefined as thisArg', () => {
      // This test checks if undefined is handled correctly as thisArg.
      const fn = function() {
        return this === undefined; // Should return true
      };
      const boundFn = bind(fn, undefined);
      expect(boundFn()).toBe(true);
    });

    it('should handle functions with no arguments', () => {
      // This test checks if a function with no arguments works correctly.
      const context = { value: 'No arguments' };
      const fn = function() {
        return this.value;
      };
      const boundFn = bind(fn, context);
      expect(boundFn()).toBe('No arguments');
    });

    it('should handle functions with a large number of arguments', () => {
      // This test checks if the function can handle a large number of arguments.
      const context = { sum: 0 };
      const fn = function(...args) {
        return args.reduce((acc, curr) => acc + curr, this.sum);
      };
      const boundFn = bind(fn, context);
      expect(boundFn(1, 2, 3, 4, 5)).toBe(15); // 1 + 2 + 3 + 4 + 5
    });

    it('should handle non-function first argument', () => {
      // This test checks if the function throws an error when the first argument is not a function.
      const nonFunction = 'not a function';
      expect(() => bind(nonFunction, {})).toThrow(TypeError);
    });
  });
});

// End of unit tests for: bind
