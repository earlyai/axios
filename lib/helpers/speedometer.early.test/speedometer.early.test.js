
// Unit tests for: speedometer



import speedometer from '../speedometer';



describe('speedometer() speedometer method', () => {
  let push;
  let min;

  beforeEach(() => {
    // Reset the speedometer function before each test
    min = 1000; // Default minimum time
    push = speedometer(10, min); // Initialize with default samplesCount and min
  });

  describe('Happy Path', () => {
    it('should return a valid speed when enough time has passed', () => {
      // Simulate pushing data
      push(100);
      push(200);
      push(300);

      // Wait for more than min milliseconds
      jest.advanceTimersByTime(min + 1);

      const speed = push(400);
      expect(speed).toBeGreaterThan(0);
    });

    it('should calculate speed correctly with multiple samples', () => {
      push(100);
      push(200);
      push(300);
      jest.advanceTimersByTime(min + 1);
      const speed1 = push(400);
      expect(speed1).toBeGreaterThan(0);

      jest.advanceTimersByTime(min + 1);
      const speed2 = push(500);
      expect(speed2).toBeGreaterThan(speed1);
    });

    it('should handle the case when no data is pushed', () => {
      jest.advanceTimersByTime(min + 1);
      const speed = push(0);
      expect(speed).toBeUndefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle the case when samplesCount is set to 0', () => {
      push = speedometer(0, min);
      jest.advanceTimersByTime(min + 1);
      const speed = push(100);
      expect(speed).toBeUndefined();
    });

    it('should handle the case when min is set to 0', () => {
      push = speedometer(10, 0);
      push(100);
      const speed = push(200);
      expect(speed).toBeUndefined(); // No time has passed
    });

    it('should handle negative chunkLength gracefully', () => {
      push(100);
      jest.advanceTimersByTime(min + 1);
      const speed = push(-50);
      expect(speed).toBeGreaterThan(0); // Should still calculate speed
    });

    it('should handle large chunkLength values', () => {
      push(1000000);
      jest.advanceTimersByTime(min + 1);
      const speed = push(2000000);
      expect(speed).toBeGreaterThan(0); // Should still calculate speed
    });

    it('should return undefined if not enough time has passed', () => {
      push(100);
      const speed = push(200);
      expect(speed).toBeUndefined(); // Not enough time has passed
    });

    it('should handle the case when all samples are filled', () => {
      for (let i = 0; i < 10; i++) {
        push(100);
      }
      jest.advanceTimersByTime(min + 1);
      const speed = push(100);
      expect(speed).toBeGreaterThan(0); // Should calculate speed correctly
    });
  });
});

// End of unit tests for: speedometer
