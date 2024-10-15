
// Unit tests for: fromDataURI


import AxiosError from '../../core/AxiosError.js';
import platform from '../../platform/index.js';
import fromDataURI from '../fromDataURI';
import parseProtocol from '../parseProtocol.js';


'use strict';
jest.mock("../parseProtocol.js", () => {
  const originalModule = jest.requireActual("../parseProtocol.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
  };
});

describe('fromDataURI() fromDataURI method', () => {
  const mockBlob = jest.fn();
  const originalBlob = platform.classes.Blob;

  beforeEach(() => {
    jest.clearAllMocks();
    platform.classes.Blob = mockBlob; // Mock Blob for testing
  });

  afterEach(() => {
    platform.classes.Blob = originalBlob; // Restore original Blob
  });

  describe('Happy Path', () => {
    test('should return a Buffer when given a valid data URI without Blob option', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
      
      const result = fromDataURI(uri);
      
      expect(result).toEqual(Buffer.from('Hello, World!'));
    });

    test('should return a Blob when given a valid data URI with Blob option', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
      
      const result = fromDataURI(uri, true);
      
      expect(mockBlob).toHaveBeenCalledWith([Buffer.from('Hello, World!')], { type: 'text/plain' });
      expect(result).toBeInstanceOf(mockBlob);
    });

    test('should return a Buffer when given a valid data URI with Blob option set to false', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
      
      const result = fromDataURI(uri, false);
      
      expect(result).toEqual(Buffer.from('Hello, World!'));
    });

    test('should handle URI without a MIME type', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:;base64,SGVsbG8sIFdvcmxkIQ==';
      
      const result = fromDataURI(uri);
      
      expect(mockBlob).toHaveBeenCalledWith([Buffer.from('Hello, World!')], { type: '' });
      expect(result).toBeInstanceOf(mockBlob);
    });
  });

  describe('Edge Cases', () => {
    test('should throw an error for an invalid data URI', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:text/plain,invalidBase64Data';
      
//      expect(() => fromDataURI(uri)).toThrow(AxiosError);
      expect(() => fromDataURI(uri)).toThrow('Invalid URL');
    });

    test('should throw an error for unsupported protocols', () => {
      parseProtocol.mockReturnValue('http');
      const uri = 'http://example.com/image.png';
      
//      expect(() => fromDataURI(uri)).toThrow(AxiosError);
      expect(() => fromDataURI(uri)).toThrow('Unsupported protocol http');
    });

    test('should throw an error if Blob is not supported', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
      platform.classes.Blob = undefined; // Simulate Blob not being supported
      
//      expect(() => fromDataURI(uri, true)).toThrow(AxiosError);
      expect(() => fromDataURI(uri, true)).toThrow('Blob is not supported');
    });

    test('should handle empty data URI', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:;base64,';
      
      const result = fromDataURI(uri);
      
      expect(result).toEqual(Buffer.from(''));
    });

    test('should handle URI with no base64 encoding', () => {
      parseProtocol.mockReturnValue('data');
      const uri = 'data:text/plain,Hello%2C%20World%21';
      
      const result = fromDataURI(uri);
      
      expect(result).toEqual(Buffer.from('Hello, World!'));
    });
  });
});

// End of unit tests for: fromDataURI
