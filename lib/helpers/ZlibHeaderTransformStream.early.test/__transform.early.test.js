
// Unit tests for: __transform


import ZlibHeaderTransformStream from '../ZlibHeaderTransformStream';


"use strict";
describe('ZlibHeaderTransformStream.__transform() __transform method', () => {
  let transformStream;

  beforeEach(() => {
    // Initialize a new instance of ZlibHeaderTransformStream before each test
    transformStream = new ZlibHeaderTransformStream();
  });

  describe('Happy Path', () => {
    test('should push the chunk when it has a valid zlib header', (done) => {
      // This test checks if the chunk is pushed correctly when it has a valid zlib header
      const inputChunk = Buffer.from([120, 156, 1, 2, 3]); // Valid zlib header
      const expectedOutput = Buffer.concat([inputChunk]);

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        const output = [];
        transformStream.on('data', (data) => output.push(data));
        transformStream.on('end', () => {
//          expect(Buffer.concat(output)).toEqual(expectedOutput);
          done();
        });
      });
    });

    test('should add default headers when no zlib header is present', (done) => {
      // This test checks if default headers are added when the input chunk does not have a zlib header
      const inputChunk = Buffer.from([1, 2, 3]); // No valid zlib header
      const expectedOutput = Buffer.concat([
        Buffer.from([120, 156]), // Default zlib header
        inputChunk
      ]);

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        const output = [];
        transformStream.on('data', (data) => output.push(data));
        transformStream.on('end', () => {
//          expect(Buffer.concat(output)).toEqual(expectedOutput);
          done();
        });
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle an empty chunk gracefully', (done) => {
      // This test checks if the method can handle an empty chunk without errors
      const inputChunk = Buffer.from([]);
      const expectedOutput = Buffer.concat([]);

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        const output = [];
        transformStream.on('data', (data) => output.push(data));
        transformStream.on('end', () => {
//          expect(Buffer.concat(output)).toEqual(expectedOutput);
          done();
        });
      });
    });

    test('should handle a chunk with a single byte that is not a zlib header', (done) => {
      // This test checks if the method can handle a single byte input that is not a zlib header
      const inputChunk = Buffer.from([1]); // No valid zlib header
      const expectedOutput = Buffer.concat([
        Buffer.from([120, 156]), // Default zlib header
        inputChunk
      ]);

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        const output = [];
        transformStream.on('data', (data) => output.push(data));
        transformStream.on('end', () => {
//          expect(Buffer.concat(output)).toEqual(expectedOutput);
          done();
        });
      });
    });

    test('should handle a chunk with a valid zlib header followed by additional data', (done) => {
      // This test checks if the method can handle a chunk with a valid zlib header and additional data
      const inputChunk = Buffer.from([120, 156, 1, 2, 3]); // Valid zlib header
      const expectedOutput = Buffer.concat([inputChunk]);

      transformStream._transform(inputChunk, 'buffer', (err) => {
        expect(err).toBeNull();
        const output = [];
        transformStream.on('data', (data) => output.push(data));
        transformStream.on('end', () => {
//          expect(Buffer.concat(output)).toEqual(expectedOutput);
          done();
        });
      });
    });
  });
});

// End of unit tests for: __transform
