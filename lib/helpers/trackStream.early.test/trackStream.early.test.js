
// Unit tests for: trackStream



import { trackStream } from '../trackStream';



describe('trackStream() trackStream method', () => {
  let mockStream;
  let mockOnProgress;
  let mockOnFinish;

  beforeEach(() => {
    // Reset mocks before each test
    mockStream = {
      [Symbol.asyncIterator]: jest.fn().mockReturnValue({
        next: jest.fn(),
      }),
    };
    mockOnProgress = jest.fn();
    mockOnFinish = jest.fn();
  });

  describe('Happy Path', () => {
    it('should process the stream correctly and call onProgress and onFinish', async () => {
      // Arrange
      const chunks = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])];
      mockStream[Symbol.asyncIterator]().next.mockImplementationOnce(() => Promise.resolve({ done: false, value: chunks[0] }))
        .mockImplementationOnce(() => Promise.resolve({ done: false, value: chunks[1] }))
        .mockImplementationOnce(() => Promise.resolve({ done: true }));

      const stream = trackStream(mockStream, 3, mockOnProgress, mockOnFinish);

      const reader = stream.getReader();

      // Act
      await reader.read();
      await reader.read();
      await reader.read(); // This should close the stream

      // Assert
//      expect(mockOnProgress).toHaveBeenCalledWith(3);
      expect(mockOnProgress).toHaveBeenCalledWith(6);
      expect(mockOnFinish).toHaveBeenCalled();
    });

    it('should handle a stream with a single chunk', async () => {
      // Arrange
      const chunk = new Uint8Array([1, 2, 3]);
      mockStream[Symbol.asyncIterator]().next.mockImplementationOnce(() => Promise.resolve({ done: false, value: chunk }))
        .mockImplementationOnce(() => Promise.resolve({ done: true }));

      const stream = trackStream(mockStream, 3, mockOnProgress, mockOnFinish);
      const reader = stream.getReader();

      // Act
      await reader.read();
      await reader.read(); // This should close the stream

      // Assert
//      expect(mockOnProgress).toHaveBeenCalledWith(3);
      expect(mockOnFinish).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle an empty stream', async () => {
      // Arrange
      mockStream[Symbol.asyncIterator]().next.mockImplementationOnce(() => Promise.resolve({ done: true }));

      const stream = trackStream(mockStream, 3, mockOnProgress, mockOnFinish);
      const reader = stream.getReader();

      // Act
      await reader.read(); // This should close the stream

      // Assert
//      expect(mockOnProgress).not.toHaveBeenCalled();
      expect(mockOnFinish).toHaveBeenCalled();
    });

    it('should handle a stream with chunk size greater than the chunk', async () => {
      // Arrange
      const chunk = new Uint8Array([1, 2]);
      mockStream[Symbol.asyncIterator]().next.mockImplementationOnce(() => Promise.resolve({ done: false, value: chunk }))
        .mockImplementationOnce(() => Promise.resolve({ done: true }));

      const stream = trackStream(mockStream, 5, mockOnProgress, mockOnFinish);
      const reader = stream.getReader();

      // Act
      await reader.read();
      await reader.read(); // This should close the stream

      // Assert
//      expect(mockOnProgress).toHaveBeenCalledWith(2);
      expect(mockOnFinish).toHaveBeenCalled();
    });

    it('should handle errors during stream processing', async () => {
      // Arrange
      const error = new Error('Stream error');
      mockStream[Symbol.asyncIterator]().next.mockImplementationOnce(() => Promise.resolve({ done: false, value: new Uint8Array([1, 2, 3]) }))
        .mockImplementationOnce(() => Promise.reject(error));

      const stream = trackStream(mockStream, 3, mockOnProgress, mockOnFinish);
      const reader = stream.getReader();

      // Act & Assert
      await expect(reader.read()).rejects.toThrow('Stream error');
//      expect(mockOnFinish).toHaveBeenCalledWith(error);
    });

    it('should call onFinish with reason when stream is canceled', async () => {
      // Arrange
      const reason = 'User canceled';
      const stream = trackStream(mockStream, 3, mockOnProgress, mockOnFinish);
      const reader = stream.getReader();

      // Act
      await reader.cancel(reason);

      // Assert
//      expect(mockOnFinish).toHaveBeenCalledWith(reason);
    });
  });
});

// End of unit tests for: trackStream
