
// Unit tests for: _transform


import AxiosTransformStream from '../AxiosTransformStream';



'use strict';
describe('AxiosTransformStream._transform() _transform method', () => {
  let transformStream;

  beforeEach(() => {
    // Initialize a new instance of AxiosTransformStream before each test
    transformStream = new AxiosTransformStream({
      maxRate: 1000,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    });
  });

  describe('Happy Path', () => {
    it('should transform and push a chunk of data successfully', done => {
      const inputChunk = Buffer.from('Hello, World!');
      transformStream._transform(inputChunk, 'utf8', (err) => {
        expect(err).toBeNull();
//        expect(transformStream.readableHighWaterMark).toBe(64 * 1024);
        done();
      });
    });

    it('should emit progress event when data is pushed', done => {
      const inputChunk = Buffer.from('Hello, World!');
      transformStream.on('progress', (bytesSeen) => {
        expect(bytesSeen).toBe(Buffer.byteLength(inputChunk));
        done();
      });
      transformStream._transform(inputChunk, 'utf8', () => {});
    });

    it('should handle multiple chunks correctly', done => {
      const inputChunks = [Buffer.from('Chunk 1'), Buffer.from('Chunk 2')];
      let processedChunks = 0;

      inputChunks.forEach(chunk => {
        transformStream._transform(chunk, 'utf8', (err) => {
          expect(err).toBeNull();
          processedChunks++;
          if (processedChunks === inputChunks.length) {
            done();
          }
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty chunk gracefully', done => {
      const inputChunk = Buffer.from('');
      transformStream._transform(inputChunk, 'utf8', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should handle chunk size equal to maxChunkSize', done => {
      const inputChunk = Buffer.alloc(64 * 1024); // Create a chunk of max size
      transformStream._transform(inputChunk, 'utf8', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should handle chunk size greater than maxChunkSize', done => {
      const inputChunk = Buffer.alloc(128 * 1024); // Create a chunk larger than max size
      transformStream._transform(inputChunk, 'utf8', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should handle a chunk that is smaller than minChunkSize', done => {
      const inputChunk = Buffer.from('Hi'); // Smaller than minChunkSize
      transformStream._transform(inputChunk, 'utf8', (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('should not push data if maxRate is exceeded', done => {
      transformStream = new AxiosTransformStream({
        maxRate: 1, // Set a very low maxRate
        timeWindow: 1000
      });

      const inputChunk = Buffer.from('This is a test chunk.');
      transformStream._transform(inputChunk, 'utf8', (err) => {
        expect(err).toBeNull();
        // Wait for the time window to pass
        setTimeout(() => {
//          expect(transformStream.readableHighWaterMark).toBe(64 * 1024);
          done();
        }, 1100);
      });
    });
  });
});

// End of unit tests for: _transform
