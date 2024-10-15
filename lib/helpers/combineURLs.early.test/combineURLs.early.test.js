
// Unit tests for: combineURLs



import combineURLs from '../combineURLs';



describe('combineURLs() combineURLs method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should combine base URL and relative URL correctly', () => {
      // This test checks the basic functionality of combining a base URL and a relative URL.
      const baseURL = 'http://example.com/api';
      const relativeURL = 'users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should handle trailing slashes in base URL', () => {
      // This test ensures that a trailing slash in the base URL is handled correctly.
      const baseURL = 'http://example.com/api/';
      const relativeURL = 'users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should handle leading slashes in relative URL', () => {
      // This test checks that leading slashes in the relative URL are removed.
      const baseURL = 'http://example.com/api';
      const relativeURL = '/users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should return the base URL if relative URL is empty', () => {
      // This test verifies that if the relative URL is empty, the base URL is returned unchanged.
      const baseURL = 'http://example.com/api';
      const relativeURL = '';
      const expected = 'http://example.com/api';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle base URL with no trailing slash and relative URL with no leading slash', () => {
      // This test checks the combination of a base URL without a trailing slash and a relative URL without a leading slash.
      const baseURL = 'http://example.com/api';
      const relativeURL = 'users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should handle base URL with multiple trailing slashes', () => {
      // This test ensures that multiple trailing slashes in the base URL are handled correctly.
      const baseURL = 'http://example.com/api///';
      const relativeURL = 'users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should handle relative URL with multiple leading slashes', () => {
      // This test checks that multiple leading slashes in the relative URL are removed.
      const baseURL = 'http://example.com/api';
      const relativeURL = '///users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should return the base URL if base URL is empty', () => {
      // This test verifies that if the base URL is empty, the function should return an empty string.
      const baseURL = '';
      const relativeURL = 'users';
      const expected = '';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should return the base URL if both base URL and relative URL are empty', () => {
      // This test checks the behavior when both URLs are empty.
      const baseURL = '';
      const relativeURL = '';
      const expected = '';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should handle base URL with query parameters', () => {
      // This test checks the combination of a base URL that includes query parameters.
      const baseURL = 'http://example.com/api?query=1';
      const relativeURL = 'users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });

    it('should handle base URL with hash fragment', () => {
      // This test checks the combination of a base URL that includes a hash fragment.
      const baseURL = 'http://example.com/api#section';
      const relativeURL = 'users';
      const expected = 'http://example.com/api/users';
      expect(combineURLs(baseURL, relativeURL)).toBe(expected);
    });
  });
});

// End of unit tests for: combineURLs
