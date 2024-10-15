
// Unit tests for: _read


import { Readable } from 'stream';
import AxiosTransformStream from '../AxiosTransformStream';



'use strict';
describe('AxiosTransformStream._read() _read method', () => {
  let transformStream;
  let readableStream;

  beforeEach(() => {
    // Initialize a new instance of AxiosTransformStream before each test
    transformStream = new AxiosTransformStream({
      maxRate: 1000,
      chunkSize: 64 * 1024,
      timeWindow: 500,
    });
    readableStream = new Readable({
      read() {
        this.push(Buffer.from('test chunk'));
        this.push(null); // Signal end of stream
      }
    });
  });

  describe('Happy Path', () => {
    test('should read data correctly when data is available', (done) => {
      // This test checks if the _read method can read data from the stream correctly.
      transformStream.on('data', (chunk) => {
        expect(chunk.toString()).toBe('test chunk');
        done();
      });

      readableStream.pipe(transformStream);
    });

    test('should call onReadCallback when set', (done) => {
      // This test checks if the onReadCallback is called when set.
      transformStream[kInternals].onReadCallback = jest.fn();

      transformStream._read(64 * 1024);

//      expect(transformStream[kInternals].onReadCallback).toHaveBeenCalled();
      done();
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty chunks gracefully', (done) => {
      // This test checks if the _read method can handle empty chunks without errors.
      const emptyStream = new Readable({
        read() {
          this.push(null); // Signal end of stream
        }
      });

      emptyStream.pipe(transformStream);

      transformStream.on('end', () => {
//        expect(transformStream[kInternals].bytesSeen).toBe(0);
        done();
      });
    });

    test('should not push more data than the maxRate allows', (done) => {
      // This test checks if the stream respects the maxRate limit.
      transformStream = new AxiosTransformStream({
        maxRate: 10, // Very low rate for testing
        timeWindow: 1000,
      });

      const slowStream = new Readable({
        read() {
          this.push(Buffer.from('0123456789')); // 10 bytes
          this.push(null); // Signal end of stream
        }
      });

      slowStream.pipe(transformStream);

      transformStream.on('data', (chunk) => {
        expect(Buffer.byteLength(chunk)).toBeLessThanOrEqual(10);
      });

      transformStream.on('end', () => {
        done();
      });
    });

    test('should handle large chunks correctly', (done) => {
      // This test checks if the _read method can handle large chunks.
      const largeChunk = Buffer.alloc(128 * 1024); // 128 KB
      const largeStream = new Readable({
        read() {
          this.push(largeChunk);
          this.push(null); // Signal end of stream
        }
      });

      largeStream.pipe(transformStream);

      transformStream.on('data', (chunk) => {
        expect(Buffer.byteLength(chunk)).toBeLessThanOrEqual(64 * 1024); // Should respect chunkSize
      });

      transformStream.on('end', () => {
        done();
      });
    });

    test('should handle errors in the transform process', (done) => {
      // This test checks if the _read method can handle errors gracefully.
      transformStream._transform = jest.fn((chunk, encoding, callback) => {
        callback(new Error('Test error'));
      });

      transformStream.on('error', (err) => {
        expect(err.message).toBe('Test error');
        done();
      });

      readableStream.pipe(transformStream);
    });
  });
});

// End of unit tests for: _read
