// src/utils/fetchWithRetry.js
export const fetchWithRetry = async (url, options = {}, retries = 5, backoff = 300) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          // Wait for the backoff time and retry
          await new Promise((resolve) => setTimeout(resolve, backoff));
          return fetchWithRetry(url, options, retries - 1, backoff * 2);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      return response.json();
    } catch (error) {
      if (retries > 0) {
        // Wait for the backoff time and retry
        await new Promise((resolve) => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      } else {
        throw error;
      }
    }
  };
  