/**
 * Check if a string looks like an external URL
 */
export const isURL = (str: string) => {
  return /http|www/.test(str);
};

/**
 * A promise to delay an async function
 * @param ms how many milliseconds to wait
 */
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getInitials = (name: string, maxChar: number) => {
  return name
    .split(/\s/)
    .map(word => word[0])
    .join("")
    .substr(0, maxChar)
    .toUpperCase();
};

/**
 * Scroll to top of screen smoothly,
 * or fallback to instant scroll to top
 */
export const scrollToTop = () => {
  try {
    // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } catch (error) {
    // fallback for older browsers
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }
};
