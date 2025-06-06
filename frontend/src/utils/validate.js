export function isValidUsername(username) {
  return /^[A-Za-z]+$/.test(username);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return  password.length >= 6;
}
