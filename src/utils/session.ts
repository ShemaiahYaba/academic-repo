
// युक्तियाँ/session.ts

/**
 * Sets up an event listener to clear authentication data from session storage
 * when the user is about to leave the page (e.g., on refresh).
 *
 * This helps ensure that sensitive session data is not persisted across page loads,
 * forcing re-authentication and enhancing security.
 *
 * @param {string} storageKey - The key used to store authentication data in session storage.
 */
export const clearAuthSessionOnReload = (storageKey: string): void => {
  // Ensure this code runs only in the browser
  if (typeof window === "undefined") {
    return;
  }

  const handleBeforeUnload = () => {
    try {
      window.sessionStorage.removeItem(storageKey);
      console.log(`Authentication session cleared from sessionStorage (key: ${storageKey}).`);
    } catch (error) {
      console.error("Failed to clear authentication session from sessionStorage:", error);
    }
  };

  // Add the event listener for the 'beforeunload' event
  window.addEventListener("beforeunload", handleBeforeUnload);

  // Return a cleanup function to remove the event listener
  // This is useful in React components to avoid memory leaks
  // return () => {
  //   window.removeEventListener("beforeunload", handleBeforeUnload);
  // };
};
