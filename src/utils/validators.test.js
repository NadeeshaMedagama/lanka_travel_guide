import { describe, it, expect } from 'vitest';
import {
  validateName, validateEmail, validatePhone, validateTravelers,
  validateInterest, validateDate, validateMessage,
  validateContactForm, hasErrors,
} from './validators';

describe('validateName', () => {
  it('rejects empty', () => expect(validateName('')).toBeTruthy());
  it('rejects too short', () => expect(validateName('A')).toBeTruthy());
  it('accepts a valid name', () => expect(validateName('Nimal')).toBe(''));
});

describe('validateEmail', () => {
  it('rejects empty', () => expect(validateEmail('')).toBeTruthy());
  it('rejects malformed', () => expect(validateEmail('not-an-email')).toBeTruthy());
  it('accepts a valid email', () => expect(validateEmail('you@example.com')).toBe(''));
});

describe('validatePhone (optional)', () => {
  it('accepts empty (optional field)', () => expect(validatePhone('')).toBe(''));
  it('accepts a valid number', () => expect(validatePhone('+94 77 123 4567')).toBe(''));
  it('rejects too-short input', () => expect(validatePhone('123')).toBeTruthy());
});

describe('validateTravelers', () => {
  it('rejects empty', () => expect(validateTravelers('')).toBeTruthy());
  it('rejects zero', () => expect(validateTravelers('0')).toBeTruthy());
  it('rejects above the max', () => expect(validateTravelers('21')).toBeTruthy());
  it('rejects non-integers', () => expect(validateTravelers('1.5')).toBeTruthy());
  it('accepts a valid count', () => expect(validateTravelers('2')).toBe(''));
});

describe('validateInterest', () => {
  it('rejects empty', () => expect(validateInterest('')).toBeTruthy());
  it('rejects unknown values', () => expect(validateInterest('Spaceship')).toBeTruthy());
  it('accepts an allowed value', () => expect(validateInterest('Nature')).toBe(''));
});

describe('validateDate (optional)', () => {
  it('accepts empty (optional field)', () => expect(validateDate('')).toBe(''));
  it('rejects a past date', () => expect(validateDate('2000-01-01')).toBeTruthy());
  it('accepts a far-future date', () => expect(validateDate('2999-12-31')).toBe(''));
});

describe('validateMessage', () => {
  it('rejects empty', () => expect(validateMessage('')).toBeTruthy());
  it('rejects too short', () => expect(validateMessage('hi')).toBeTruthy());
  it('accepts a valid message', () => expect(validateMessage('We would love to visit Sigiriya.')).toBe(''));
});

describe('validateContactForm + hasErrors', () => {
  const validForm = {
    name: 'Nimal Perera', email: 'nimal@example.com', phone: '',
    travelers: '2', interest: 'Nature', date: '', message: 'We want a nature-focused trip.',
  };

  it('reports no errors for a fully valid form', () => {
    expect(hasErrors(validateContactForm(validForm))).toBe(false);
  });

  it('reports errors when required fields are missing', () => {
    const errors = validateContactForm({ ...validForm, name: '', email: 'bad' });
    expect(hasErrors(errors)).toBe(true);
    expect(errors.name).toBeTruthy();
    expect(errors.email).toBeTruthy();
  });
});
