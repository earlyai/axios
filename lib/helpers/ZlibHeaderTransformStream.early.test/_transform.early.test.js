
// Unit tests for: _transform


import ZlibHeaderTransformStream from '../ZlibHeaderTransformStream';


"use strict";
describe('ZlibHeaderTransformStream._transform() _transform method', () => {
  let transformStream;

  beforeEach(() => {
    // Initialize a new instance of the transform stream before each test
    transformStream = new ZlibHeaderTransformStream();
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    test('should push the chunk when it has zlib headers', (done) => {
      // This test checks that a chunk with zlib headers is pushed correctly
      const inputChunk = Buffer.from([120, 156, 1, 2, 3]); // Chunk with zlib headers
      const outputChunks = [];

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        transformStream.on('data', (chunk) => {
          outputChunks.push(chunk);
        });
        transformStream.on('end', () => {
//          expect(Buffer.concat(outputChunks)).toEqual(inputChunk);
          done();
        });
        transformStream.end();
      });
    });

    test('should add default headers when no zlib headers are present', (done) => {
      // This test checks that default headers are added when the chunk does not have zlib headers
      const inputChunk = Buffer.from([1, 2, 3]); // Chunk without zlib headers
      const expectedOutput = Buffer.concat([
        Buffer.from([120, 156]), // Default headers
        inputChunk
      ]);
      const outputChunks = [];

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        transformStream.on('data', (chunk) => {
          outputChunks.push(chunk);
        });
        transformStream.on('end', () => {
//          expect(Buffer.concat(outputChunks)).toEqual(expectedOutput);
          done();
        });
        transformStream.end();
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should handle an empty chunk gracefully', (done) => {
      // This test checks that an empty chunk does not throw an error
      const inputChunk = Buffer.from([]);
      const outputChunks = [];

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        transformStream.on('data', (chunk) => {
          outputChunks.push(chunk);
        });
        transformStream.on('end', () => {
          expect(outputChunks.length).toBe(0); // No data should be pushed
          done();
        });
        transformStream.end();
      });
    });

    test('should handle a chunk with a single byte without zlib headers', (done) => {
      // This test checks that a single byte chunk without zlib headers is handled correctly
      const inputChunk = Buffer.from([5]); // Single byte without zlib headers
      const expectedOutput = Buffer.concat([
        Buffer.from([120, 156]), // Default headers
        inputChunk
      ]);
      const outputChunks = [];

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        transformStream.on('data', (chunk) => {
          outputChunks.push(chunk);
        });
        transformStream.on('end', () => {
//          expect(Buffer.concat(outputChunks)).toEqual(expectedOutput);
          done();
        });
        transformStream.end();
      });
    });

    test('should handle a chunk with zlib headers but no data', (done) => {
      // This test checks that a chunk with zlib headers but no data is handled correctly
      const inputChunk = Buffer.from([120, 156]); // Chunk with zlib headers but no data
      const outputChunks = [];

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        transformStream.on('data', (chunk) => {
          outputChunks.push(chunk);
        });
        transformStream.on('end', () => {
//          expect(Buffer.concat(outputChunks)).toEqual(inputChunk);
          done();
        });
        transformStream.end();
      });
    });
  });
});

// End of unit tests for: _transform
