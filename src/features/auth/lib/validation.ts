/**
 * Frontend validation rules for authentication.
 *
 * IMPORTANT: These validation rules MUST be kept in sync with the backend validation
 * (/src/auth/dto/).
 * Any changes here should be reflected on the backend and vice versa.
 */

// Password validation constants (must match backend)
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 64;

// Password must contain at least one uppercase, lowercase, number, and special character
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const PASSWORD_REQUIREMENTS = [
  {
    label: "Мінімум 8 символів",
    test: (pwd: string) => pwd.length >= MIN_PASSWORD_LENGTH,
  },
  { label: "Одна велика літера", test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: "Одна мала літера", test: (pwd: string) => /[a-z]/.test(pwd) },
  { label: "Одна цифра", test: (pwd: string) => /\d/.test(pwd) },
  {
    label: "Один спецсимвол (@$!%*?&)",
    test: (pwd: string) => /[@$!%*?&]/.test(pwd),
  },
];

export const validatePassword = (password: string): boolean => {
  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    password.length <= MAX_PASSWORD_LENGTH &&
    PASSWORD_REGEX.test(password)
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
