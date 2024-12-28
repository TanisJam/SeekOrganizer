/**
 * Creates a Promise that resolves after a delay.
 * 
 * @param {number} [delay] - If provided alone, the exact delay in ms
 * @param {number} [maxDelay] - If provided with delay, creates a random delay between delay and maxDelay in ms
 * @returns {Promise<void>} A Promise that resolves after the specified delay
 * 
 * @example
 * // Wait for a random delay between 500ms and 2500ms
 * await fakeDelay();
 * 
 * // Wait for exactly 1000ms
 * await fakeDelay(1000);
 * 
 * // Wait for a random delay between 1000ms and 3000ms
 * await fakeDelay(1000, 3000);
 */
export const fakeDelay = (delay?: number, maxDelay?: number) => {
  let finalDelay: number;

  if (typeof delay === 'undefined') {
    // Default behavior: random delay between 500ms and 2500ms
    finalDelay = Math.floor(Math.random() * 2000) + 500;
  } else if (typeof maxDelay === 'undefined') {
    // Single parameter: exact delay
    finalDelay = delay;
  } else {
    // Two parameters: random delay between min and max
    finalDelay = Math.floor(Math.random() * (maxDelay - delay)) + delay;
  }

  return new Promise((resolve) => {
    setTimeout(resolve, finalDelay);
  });
};
