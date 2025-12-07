/**
 * Extract error message from API response or Error object.
 */

const DEFAULT_ERROR_MESSAGE = 'Щось пішло не так';
const NETWORK_ERROR_MESSAGE = 'Немає з\'єднання з сервером';

/**
 * Get error message from various error formats
 */
export function getErrorMessage(error: unknown): string {
  // Network errors (no internet, server down)
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return NETWORK_ERROR_MESSAGE;
  }

  // Error object with message
  if (error instanceof Error) {
    return error.message || DEFAULT_ERROR_MESSAGE;
  }

  // String error
  if (typeof error === 'string') {
    return error;
  }

  // API response object with message field
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    
    if (typeof err.message === 'string') {
      return err.message;
    }
  }

  return DEFAULT_ERROR_MESSAGE;
}

/**
 * Parse API error response and return message
 */
export async function parseApiError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return getErrorMessage(data);
  } catch {
    return DEFAULT_ERROR_MESSAGE;
  }
}
