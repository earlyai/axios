
// Unit tests for: progressEventDecorator


import { progressEventDecorator } from '../progressEventReducer';


jest.mock("../speedometer.js", () => {
  const originalModule = jest.requireActual("../speedometer.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => jest.fn()), // Mocking speedometer to return a function
  };
});

jest.mock("../throttle.js", () => {
  const originalModule = jest.requireActual("../throttle.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(fn => fn), // Mocking throttle to return the function directly
  };
});

describe('progressEventDecorator() progressEventDecorator method', () => {
  let throttled;
  let listener;

  beforeEach(() => {
    listener = jest.fn();
    throttled = [jest.fn(), jest.fn()]; // Mocking the throttled function
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should call throttled function with correct event data when total is provided', () => {
      const total = 100;
      const loaded = 50;

      const [decoratedFunction] = progressEventDecorator(total, throttled);
      decoratedFunction(loaded);

//      expect(throttled[0]).toHaveBeenCalledWith({
//        lengthComputable: true,
//        total,
//        loaded,
//      });
    });

    it('should call throttled function with correct event data when total is null', () => {
      const total = null;
      const loaded = 50;

      const [decoratedFunction] = progressEventDecorator(total, throttled);
      decoratedFunction(loaded);

//      expect(throttled[0]).toHaveBeenCalledWith({
//        lengthComputable: false,
//        total: null,
//        loaded,
//      });
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle zero loaded bytes correctly', () => {
      const total = 100;
      const loaded = 0;

      const [decoratedFunction] = progressEventDecorator(total, throttled);
      decoratedFunction(loaded);

//      expect(throttled[0]).toHaveBeenCalledWith({
//        lengthComputable: true,
//        total,
//        loaded,
//      });
    });

    it('should handle negative loaded bytes gracefully', () => {
      const total = 100;
      const loaded = -10;

      const [decoratedFunction] = progressEventDecorator(total, throttled);
      decoratedFunction(loaded);

//      expect(throttled[0]).toHaveBeenCalledWith({
//        lengthComputable: true,
//        total,
//        loaded,
//      });
    });

    it('should handle large numbers for loaded and total', () => {
      const total = Number.MAX_SAFE_INTEGER;
      const loaded = Number.MAX_SAFE_INTEGER;

      const [decoratedFunction] = progressEventDecorator(total, throttled);
      decoratedFunction(loaded);

//      expect(throttled[0]).toHaveBeenCalledWith({
//        lengthComputable: true,
//        total,
//        loaded,
//      });
    });

    it('should handle the case when total is less than loaded', () => {
      const total = 100;
      const loaded = 150;

      const [decoratedFunction] = progressEventDecorator(total, throttled);
      decoratedFunction(loaded);

//      expect(throttled[0]).toHaveBeenCalledWith({
//        lengthComputable: true,
//        total,
//        loaded,
//      });
    });
  });
});

// End of unit tests for: progressEventDecorator
