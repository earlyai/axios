
// Unit tests for: deprecatedMethod



import deprecatedMethod from '../deprecatedMethod';



describe('deprecatedMethod() deprecatedMethod method', () => {
  // Mock console.warn to capture warnings
  const originalWarn = console.warn;
  beforeAll(() => {
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = originalWarn; // Restore original console.warn
  });

  // Happy Path Tests
  it('should log a deprecation warning with method name', () => {
    // This test checks if the method logs the correct deprecation message
    deprecatedMethod('oldMethod');
    expect(console.warn).toHaveBeenCalledWith(
      'DEPRECATED method `oldMethod`. This method will be removed in a future release.'
    );
  });

  it('should log a deprecation warning with method name and alternative', () => {
    // This test checks if the method logs the correct deprecation message with an alternative
    deprecatedMethod('oldMethod', 'newMethod');
    expect(console.warn).toHaveBeenCalledWith(
      'DEPRECATED method `oldMethod`. Use `newMethod` instead. This method will be removed in a future release.'
    );
  });

  it('should log a deprecation warning with method name, alternative, and documentation link', () => {
    // This test checks if the method logs the correct deprecation message with an alternative and documentation
    deprecatedMethod('oldMethod', 'newMethod', 'http://example.com/docs');
    expect(console.warn).toHaveBeenCalledWith(
      'DEPRECATED method `oldMethod`. Use `newMethod` instead. This method will be removed in a future release.'
    );
    expect(console.warn).toHaveBeenCalledWith(
      'For more information about usage see http://example.com/docs'
    );
  });

  // Edge Case Tests
  it('should handle empty method name gracefully', () => {
    // This test checks if the method can handle an empty method name
    deprecatedMethod('');
    expect(console.warn).toHaveBeenCalledWith(
      'DEPRECATED method ``. This method will be removed in a future release.'
    );
  });

  it('should handle undefined instead parameter gracefully', () => {
    // This test checks if the method can handle undefined instead parameter
    deprecatedMethod('oldMethod', undefined);
    expect(console.warn).toHaveBeenCalledWith(
      'DEPRECATED method `oldMethod`. This method will be removed in a future release.'
    );
  });

  it('should handle undefined docs parameter gracefully', () => {
    // This test checks if the method can handle undefined docs parameter
    deprecatedMethod('oldMethod', 'newMethod', undefined);
    expect(console.warn).toHaveBeenCalledWith(
      'DEPRECATED method `oldMethod`. Use `newMethod` instead. This method will be removed in a future release.'
    );
  });

  it('should not throw an error if console.warn fails', () => {
    // This test checks if the method does not throw an error when console.warn fails
    console.warn = jest.fn(() => { throw new Error('warn failed'); });
    expect(() => deprecatedMethod('oldMethod')).not.toThrow();
  });
});

// End of unit tests for: deprecatedMethod
