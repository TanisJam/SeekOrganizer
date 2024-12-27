/**
 * Generates a pseudo-random string identifier.
 * 
 * This function creates a unique string by converting a random number to base-36
 * and taking a substring of it. The resulting string can be used as a simple ID.
 * 
 * @returns {string} A random string that can be used as an identifier.
 * 
 * @example
 * const id = generateId(); // Returns something like "x7f2c"
 */
export function generateId() {
  return Math.random().toString(36).substring(7);
}
