/**
 * Check if a string looks like an external URL
 */
export const isURL = (str: string) => {
  return /http|www|\./.test(str);
};
