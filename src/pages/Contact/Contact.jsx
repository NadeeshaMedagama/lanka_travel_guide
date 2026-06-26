import React, { useState } from 'react';
import { validateContactForm, hasErrors, INTERESTS } from '../../utils/validators';
import './Contact.css';

// versioned key so the storage schema can evolve safely (bump to v2 if the shape changes)
const STORAGE_KEY = 'lkg_inquiries_v1';

const EMPTY_FORM = {
  name: '', email: '', phone: '', travelers: '1', interest: '', date: '', message: '',
};

const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Contact / "Plan Your Trip" page.
 *
 * Demonstrates STRICTLY CLIENT-SIDE form validation across several input types (text, email, tel,
 * number, select, date, textarea). Validation logic lives in src/utils/validators.js as pure
 * functions; this component owns the UI state (values / errors / touched) and wiring.
 *
 * UX PATTERN: a field is validated on blur (once "touched") and re-validated live on every change
 * thereafter — so users get immediate feedback but aren't nagged before they've interacted.
 */
function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // live re-validation only after the field has been touched, to avoid premature errors
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, ...pickError(name, next) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, ...pickError(name, values) }));
  };

  // validate a single field by reusing the aggregate validator and picking one key out
  const pickError = (name, vals) => ({ [name]: validateContactForm(vals)[name] });

  const handleSubmit = (e) => {
    // preventDefault stops the browser's native full-page form submission (SPA stays in place)
    e.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, travelers: true, interest: true, date: true, message: true });

    if (hasErrors(nextErrors)) {
      // accessibility: move focus to the first invalid field
      const firstInvalid = Object.keys(nextErrors).find((k) => nextErrors[k]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    // persist the inquiry locally (data persistence requirement) — append to the stored list
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push({ ...values, submittedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.warn('Could not persist inquiry:', err);
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="contact-success" role="status" aria-live="polite">
          <div className="success-icon" aria-hidden="true">✅</div>
          <h1>Thank you, {values.name.trim().split(' ')[0]}!</h1>
          <p>Your trip inquiry has been received. We'll be in touch at <strong>{values.email}</strong> soon.</p>
          <button className="contact-submit" onClick={resetForm}>Send another inquiry</button>
        </div>
      </div>
    );
  }

  // small helper to render the error message + aria wiring for a field
  const fieldError = (name) =>
    touched[name] && errors[name] ? (
      <span className="field-error" id={`${name}-error`} role="alert">{errors[name]}</span>
    ) : null;

  const inputClass = (name) =>
    `form-control ${touched[name] && errors[name] ? 'invalid' : ''}`;

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1 className="contact-title">📩 Plan Your Trip</h1>
        <p className="contact-subtitle">Tell us what you'd love to explore in Sri Lanka and we'll help you plan it.</p>
      </header>

      {/* noValidate disables the browser's built-in bubbles so OUR client-side rules are in full control */}
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name <span className="req">*</span></label>
          <input
            id="name" name="name" type="text" autoComplete="name" placeholder="e.g. Nimal Perera"
            value={values.name} onChange={handleChange} onBlur={handleBlur}
            className={inputClass('name')}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          />
          {fieldError('name')}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span className="req">*</span></label>
          <input
            id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
            value={values.email} onChange={handleChange} onBlur={handleBlur}
            className={inputClass('email')}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          />
          {fieldError('email')}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
            <input
              id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+94 77 123 4567"
              value={values.phone} onChange={handleChange} onBlur={handleBlur}
              className={inputClass('phone')}
              aria-invalid={Boolean(touched.phone && errors.phone)}
              aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
            />
            {fieldError('phone')}
          </div>

          <div className="form-group">
            <label htmlFor="travelers">Travelers <span className="req">*</span></label>
            <input
              id="travelers" name="travelers" type="number" min="1" max="20" inputMode="numeric"
              value={values.travelers} onChange={handleChange} onBlur={handleBlur}
              className={inputClass('travelers')}
              aria-invalid={Boolean(touched.travelers && errors.travelers)}
              aria-describedby={touched.travelers && errors.travelers ? 'travelers-error' : undefined}
            />
            {fieldError('travelers')}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="interest">Main Interest <span className="req">*</span></label>
            <select
              id="interest" name="interest"
              value={values.interest} onChange={handleChange} onBlur={handleBlur}
              className={inputClass('interest')}
              aria-invalid={Boolean(touched.interest && errors.interest)}
              aria-describedby={touched.interest && errors.interest ? 'interest-error' : undefined}
            >
              <option value="">Select…</option>
              {INTERESTS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {fieldError('interest')}
          </div>

          <div className="form-group">
            <label htmlFor="date">Travel Date <span className="optional">(optional)</span></label>
            <input
              id="date" name="date" type="date" min={TODAY}
              value={values.date} onChange={handleChange} onBlur={handleBlur}
              className={inputClass('date')}
              aria-invalid={Boolean(touched.date && errors.date)}
              aria-describedby={touched.date && errors.date ? 'date-error' : undefined}
            />
            {fieldError('date')}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message <span className="req">*</span></label>
          <textarea
            id="message" name="message" rows="4" maxLength="500"
            placeholder="Tell us about your dream trip…"
            value={values.message} onChange={handleChange} onBlur={handleBlur}
            className={inputClass('message')}
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          />
          <div className="char-counter">{values.message.trim().length}/500</div>
          {fieldError('message')}
        </div>

        <button type="submit" className="contact-submit">Send Inquiry</button>
      </form>
    </div>
  );
}

export default Contact;
