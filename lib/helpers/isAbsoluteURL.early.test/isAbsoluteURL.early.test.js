
// Unit tests for: isAbsoluteURL



import isAbsoluteURL from '../isAbsoluteURL';



describe('isAbsoluteURL() isAbsoluteURL method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return true for absolute URL with http scheme', () => {
      // Test for a standard absolute URL with http
      const url = 'http://example.com';
      expect(isAbsoluteURL(url)).toBe(true);
    });

    it('should return true for absolute URL with https scheme', () => {
      // Test for a standard absolute URL with https
      const url = 'https://example.com';
      expect(isAbsoluteURL(url)).toBe(true);
    });

    it('should return true for absolute URL with ftp scheme', () => {
      // Test for an absolute URL with ftp
      const url = 'ftp://example.com';
      expect(isAbsoluteURL(url)).toBe(true);
    });

    it('should return true for protocol-relative URL', () => {
      // Test for a protocol-relative URL
      const url = '//example.com';
      expect(isAbsoluteURL(url)).toBe(true);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return false for relative URL without scheme', () => {
      // Test for a relative URL
      const url = 'example.com/path';
      expect(isAbsoluteURL(url)).toBe(false);
    });

    it('should return false for empty string', () => {
      // Test for an empty string
      const url = '';
      expect(isAbsoluteURL(url)).toBe(false);
    });

    it('should return false for URL with only a path', () => {
      // Test for a URL that only has a path
      const url = '/path/to/resource';
      expect(isAbsoluteURL(url)).toBe(false);
    });

    it('should return false for invalid URL format', () => {
      // Test for an invalid URL format
      const url = 'htp://invalid-url';
      expect(isAbsoluteURL(url)).toBe(false);
    });

    it('should return false for URL with spaces', () => {
      // Test for a URL that contains spaces
      const url = 'http://example .com';
      expect(isAbsoluteURL(url)).toBe(false);
    });

    it('should return false for URL with special characters', () => {
      // Test for a URL with special characters that is not absolute
      const url = 'http://example.com/path?query=1#fragment';
      expect(isAbsoluteURL(url)).toBe(true); // This is still an absolute URL
    });

    it('should return false for malformed URLs', () => {
      // Test for a malformed URL
      const url = '://missing-scheme.com';
      expect(isAbsoluteURL(url)).toBe(false);
    });

    it('should return false for URLs with only a scheme', () => {
      // Test for a URL that only has a scheme
      const url = 'http:';
      expect(isAbsoluteURL(url)).toBe(false);
    });
  });
});

// End of unit tests for: isAbsoluteURL
