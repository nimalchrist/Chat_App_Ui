// to validate the email
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// to validate the password
export const validatePassword = (
  password: string
): { isValid: boolean; message: string } => {
  if (!password.trim()) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  return { isValid: true, message: "Password is valid" };
};
