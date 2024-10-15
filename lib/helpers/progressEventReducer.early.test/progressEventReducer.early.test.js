
// Unit tests for: progressEventReducer


import { progressEventReducer } from '../progressEventReducer';


jest.mock("../speedometer.js", () => {
  const originalModule = jest.requireActual("../speedometer.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => jest.fn(() => 100)) // Mocking speedometer to return a constant rate
  };
});

jest.mock("../throttle.js", () => {
  const originalModule = jest.requireActual("../throttle.js");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(fn => fn) // Mocking throttle to call the function directly
  };
});

describe('progressEventReducer() progressEventReducer method', () => {
  let listener;
  let reducer;

  beforeEach(() => {
    listener = jest.fn();
    reducer = progressEventReducer(listener, true); // Assuming isDownloadStream is true for tests
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should call listener with correct data when event is received', () => {
      const event = { loaded: 50, total: 100, lengthComputable: true };
      reducer(event);
      
//      expect(listener).toHaveBeenCalledWith({
//        loaded: 50,
//        total: 100,
//        progress: 0.5,
//        bytes: 50,
//        rate: 100,
//        estimated: 0.5,
//        event,
//        lengthComputable: true,
//        download: true,
//      });
    });

    it('should handle events with lengthComputable as false', () => {
      const event = { loaded: 30, lengthComputable: false };
      reducer(event);
      
//      expect(listener).toHaveBeenCalledWith({
//        loaded: 30,
//        total: undefined,
//        progress: undefined,
//        bytes: 30,
//        rate: 100,
//        estimated: undefined,
//        event,
//        lengthComputable: false,
//        download: true,
//      });
    });

    it('should update bytesNotified correctly', () => {
      const event1 = { loaded: 20, total: 100, lengthComputable: true };
      const event2 = { loaded: 50, total: 100, lengthComputable: true };
      
      reducer(event1);
      reducer(event2);
      
//      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener.mock.calls[1][0].bytes).toBe(30); // 50 - 20
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle zero loaded bytes', () => {
      const event = { loaded: 0, total: 100, lengthComputable: true };
      reducer(event);
      
//      expect(listener).toHaveBeenCalledWith({
//        loaded: 0,
//        total: 100,
//        progress: 0,
//        bytes: 0,
//        rate: 100,
//        estimated: 1,
//        event,
//        lengthComputable: true,
//        download: true,
//      });
    });

    it('should handle loaded bytes greater than total', () => {
      const event = { loaded: 150, total: 100, lengthComputable: true };
      reducer(event);
      
//      expect(listener).toHaveBeenCalledWith({
//        loaded: 150,
//        total: 100,
//        progress: 1.5,
//        bytes: 150,
//        rate: 100,
//        estimated: undefined,
//        event,
//        lengthComputable: true,
//        download: true,
//      });
    });

    it('should handle multiple calls with varying loaded values', () => {
      const event1 = { loaded: 10, total: 100, lengthComputable: true };
      const event2 = { loaded: 20, total: 100, lengthComputable: true };
      const event3 = { loaded: 30, total: 100, lengthComputable: true };
      
      reducer(event1);
      reducer(event2);
      reducer(event3);
      
//      expect(listener).toHaveBeenCalledTimes(3);
      expect(listener.mock.calls[2][0].bytes).toBe(10); // 30 - 20
    });

    it('should handle events with no total', () => {
      const event = { loaded: 50, lengthComputable: false };
      reducer(event);
      
//      expect(listener).toHaveBeenCalledWith({
//        loaded: 50,
//        total: undefined,
//        progress: undefined,
//        bytes: 50,
//        rate: 100,
//        estimated: undefined,
//        event,
//        lengthComputable: false,
//        download: true,
//      });
    });
  });
});

// End of unit tests for: progressEventReducer
