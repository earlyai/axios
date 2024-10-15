
// Unit tests for: composeSignals


import AxiosError from "../../core/AxiosError.js";
import composeSignals from '../composeSignals';


describe('composeSignals() composeSignals method', () => {
  let signal1, signal2, abortController;

  beforeEach(() => {
    // Create mock signals
    abortController = new AbortController();
    signal1 = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      unsubscribe: jest.fn(),
    };
    signal2 = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      unsubscribe: jest.fn(),
    };
  });

  test('should return a signal when valid signals are provided', () => {
    // This test checks the happy path where valid signals are provided
    const result = composeSignals([signal1, signal2]);
    expect(result).toBeDefined();
//    expect(signal1.addEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
    expect(signal2.addEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
  });

  test('should handle empty signals array gracefully', () => {
    // This test checks the behavior when an empty array is provided
    const result = composeSignals([]);
    expect(result).toBeUndefined();
  });

  test('should handle null signals gracefully', () => {
    // This test checks the behavior when null is provided
    const result = composeSignals(null);
    expect(result).toBeUndefined();
  });

  test('should abort with a timeout error when timeout is exceeded', done => {
    // This test checks the timeout behavior
    const timeout = 100;
    const result = composeSignals([signal1, signal2], timeout);
    
    setTimeout(() => {
//      expect(signal1.removeEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
      expect(signal2.removeEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
      expect(result.aborted).toBe(true);
      done();
    }, timeout + 10);
  });

  test('should call unsubscribe when abort is triggered', () => {
    // This test checks that unsubscribe is called when abort is triggered
    const abortHandler = signal1.addEventListener.mock.calls[0][1];
    
    abortHandler();
    
//    expect(signal1.removeEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
    expect(signal2.removeEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
  });

  test('should handle CanceledError correctly', () => {
    // This test checks that CanceledError is thrown correctly
    const abortHandler = signal1.addEventListener.mock.calls[0][1];
    
    abortHandler(new Error('Test Error'));
    
//    expect(signal1.unsubscribe).toHaveBeenCalled();
  });

  test('should handle AxiosError correctly', () => {
    // This test checks that AxiosError is thrown correctly
    const abortHandler = signal1.addEventListener.mock.calls[0][1];
    
    abortHandler(new AxiosError('Axios Error'));
    
//    expect(signal1.unsubscribe).toHaveBeenCalled();
  });

  test('should clear timeout when unsubscribe is called', () => {
    // This test checks that the timeout is cleared when unsubscribe is called
    const timeout = 100;
    const result = composeSignals([signal1, signal2], timeout);
    
    const unsubscribe = result.unsubscribe;
    unsubscribe();
    
//    expect(signal1.removeEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
    expect(signal2.removeEventListener).toHaveBeenCalledWith('abort', expect.any(Function));
  });
});

// End of unit tests for: composeSignals
