/**
 * Client-side form validators (pure functions).
 *
 * WHY A SEPARATE MODULE: Validation rules are pure, side-effect-free functions. Keeping them out of
 * the component makes them (a) reusable, (b) trivially unit-testable, and (c) easy to reason about —
 * each returns an empty string '' when valid, or a human-readable error message when invalid.
 * WHY CLIENT-SIDE: Instant feedback without a network round-trip. (A real backend would re-validate
 * server-side too, since client checks can always be bypassed — but the assignment scope is client-side.)
 */

// Pragmatic email pattern: non-space chars, '@', non-space chars, '.', non-space chars.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional '+', then 7–15 chars of digits/spaces/hyphens (covers most international formats).
export const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;

export const INTERESTS = ['Nature', 'Historical', 'Hotels', 'All'];

export function validateName(value = '') {
  const s = value.trim();
  if (!s) return 'Name is required.';
  if (s.length < 2) return 'Name must be at least 2 characters.';
  if (s.length > 50) return 'Name must be under 50 characters.';
  return '';
}

export function validateEmail(value = '') {
  const s = value.trim();
  if (!s) return 'Email is required.';
  if (!EMAIL_RE.test(s)) return 'Enter a valid email address.';
  return '';
}

// Phone is OPTIONAL — only validated when the user actually types something.
export function validatePhone(value = '') {
  const s = value.trim();
  if (!s) return '';
  if (!PHONE_RE.test(s)) return 'Enter a valid phone number (7–15 digits).';
  return '';
}

export function validateTravelers(value) {
  if (value === '' || value === null || value === undefined) return 'Number of travelers is required.';
  const n = Number(value);
  if (!Number.isInteger(n)) return 'Enter a whole number.';
  if (n < 1) return 'At least 1 traveler is required.';
  if (n > 20) return 'Maximum 20 travelers per inquiry.';
  return '';
}

export function validateInterest(value = '') {
  if (!value) return 'Please choose an interest.';
  if (!INTERESTS.includes(value)) return 'Invalid selection.';
  return '';
}

// Date is OPTIONAL — when provided it must be today or later.
export function validateDate(value = '') {
  if (!value) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Enter a valid date.';
  if (d < today) return 'Travel date cannot be in the past.';
  return '';
}

export function validateMessage(value = '') {
  const s = value.trim();
  if (!s) return 'Message is required.';
  if (s.length < 10) return 'Message must be at least 10 characters.';
  if (s.length > 500) return 'Message must be under 500 characters.';
  return '';
}

// Aggregate validator — runs every field rule and returns an { field: errorMessage } map.
export function validateContactForm(values) {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    travelers: validateTravelers(values.travelers),
    interest: validateInterest(values.interest),
    date: validateDate(values.date),
    message: validateMessage(values.message),
  };
}

// True if any field has a non-empty error string.
export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
