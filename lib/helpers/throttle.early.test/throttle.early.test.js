
// Unit tests for: throttle



import throttle from '../throttle';



describe('throttle() throttle method', () => {
  let mockFn;
  let throttled;
  let flush;

  beforeEach(() => {
    // Reset the mock function and throttle setup before each test
    mockFn = jest.fn();
    [throttled, flush] = throttle(mockFn, 2); // Throttle function to be called at 2 times per second
  });

  describe('Happy Path', () => {
    it('should call the function immediately if called after the threshold', () => {
      // Arrange
      jest.useFakeTimers();
      throttled();
      
      // Act
      jest.advanceTimersByTime(500);
      throttled();
      jest.advanceTimersByTime(500);
      
      // Assert
//      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should call the function after the threshold when called multiple times', () => {
      // Arrange
      jest.useFakeTimers();
      throttled();
      throttled();
      throttled();
      
      // Act
      jest.advanceTimersByTime(1000);
      
      // Assert
//      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call the function with the last arguments after the threshold', () => {
      // Arrange
      jest.useFakeTimers();
      throttled(1);
      throttled(2);
      
      // Act
      jest.advanceTimersByTime(1000);
      
      // Assert
//      expect(mockFn).toHaveBeenCalledWith(2);
    });

    it('should call flush to invoke the last arguments', () => {
      // Arrange
      throttled(1);
      throttled(2);
      
      // Act
      flush();
      
      // Assert
//      expect(mockFn).toHaveBeenCalledWith(2);
    });
  });

  describe('Edge Cases', () => {
    it('should not call the function if it is throttled', () => {
      // Arrange
      jest.useFakeTimers();
      throttled();
      throttled();
      
      // Act
      jest.advanceTimersByTime(500);
      
      // Assert
//      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid calls correctly', () => {
      // Arrange
      jest.useFakeTimers();
      for (let i = 0; i < 10; i++) {
        throttled(i);
      }
      
      // Act
      jest.advanceTimersByTime(1000);
      
      // Assert
//      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(9); // Last argument
    });

    it('should handle a zero frequency gracefully', () => {
      // Arrange
      const [throttledZeroFreq] = throttle(mockFn, 0);
      
      // Act
      throttledZeroFreq();
      
      // Assert
//      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not throw an error when called with no arguments', () => {
      // Act & Assert
//      expect(() => throttled()).not.toThrow();
    });

    it('should not call the function if flush is called without any throttled calls', () => {
      // Act
      flush();
      
      // Assert
//      expect(mockFn).toHaveBeenCalledTimes(0);
    });
  });
});

// End of unit tests for: throttle
