
// Unit tests for: parseProtocol



import parseProtocol from '../parseProtocol';



describe('parseProtocol() parseProtocol method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return "http" for a valid HTTP URL', () => {
      // This test checks if the function correctly parses the "http" protocol.
      const url = 'http://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('http');
    });

    it('should return "https" for a valid HTTPS URL', () => {
      // This test checks if the function correctly parses the "https" protocol.
      const url = 'https://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('https');
    });

    it('should return "ftp" for a valid FTP URL', () => {
      // This test checks if the function correctly parses the "ftp" protocol.
      const url = 'ftp://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('ftp');
    });

    it('should return "mailto" for a valid mailto URL', () => {
      // This test checks if the function correctly parses the "mailto" protocol.
      const url = 'mailto:someone@example.com';
      const result = parseProtocol(url);
      expect(result).toBe('mailto');
    });

    it('should return "ws" for a valid WebSocket URL', () => {
      // This test checks if the function correctly parses the "ws" protocol.
      const url = 'ws://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('ws');
    });

    it('should return "wss" for a valid secure WebSocket URL', () => {
      // This test checks if the function correctly parses the "wss" protocol.
      const url = 'wss://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('wss');
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should return an empty string for a URL without a protocol', () => {
      // This test checks if the function returns an empty string when no protocol is present.
      const url = 'example.com';
      const result = parseProtocol(url);
      expect(result).toBe('');
    });

    it('should return an empty string for an invalid protocol', () => {
      // This test checks if the function returns an empty string for an invalid protocol format.
      const url = 'invalid://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('');
    });

    it('should return an empty string for a protocol that is too long', () => {
      // This test checks if the function returns an empty string for a protocol longer than 25 characters.
      const url = 'thisisaverylongprotocolname://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('');
    });

    it('should return an empty string for a protocol with special characters', () => {
      // This test checks if the function returns an empty string for a protocol with special characters.
      const url = 'http@://example.com';
      const result = parseProtocol(url);
      expect(result).toBe('');
    });

    it('should return an empty string for a protocol with only a colon', () => {
      // This test checks if the function returns an empty string when the input is just a colon.
      const url = ':example.com';
      const result = parseProtocol(url);
      expect(result).toBe('');
    });

    it('should return an empty string for an empty string input', () => {
      // This test checks if the function returns an empty string when the input is empty.
      const url = '';
      const result = parseProtocol(url);
      expect(result).toBe('');
    });
  });
});

// End of unit tests for: parseProtocol
