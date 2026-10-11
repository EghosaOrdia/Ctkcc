import { useMemo, useState } from 'react';
import {
  BLANK_MEMBER,
  CELL_GROUPS,
  DEPARTMENTS,
  GENDERS,
  MARITAL_STATUSES,
  STATUSES,
} from '../constants/constants';
import { parseISO, todayISO } from '../utils/dates';
import { isValidNigerianPhone, normalizePhone } from '../utils/phone';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = 'Enter a first name.';
  if (!values.lastName.trim()) errors.lastName = 'Enter a last name.';
  if (!values.gender) errors.gender = 'Select a gender.';
  if (!values.phone.trim()) errors.phone = 'Enter a phone number.';
  else if (!isValidNigerianPhone(values.phone))
    errors.phone = 'Use a Nigerian number like 0803 123 4567 or +234 803 123 4567.';
  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Enter a valid email address, for example name@gmail.com.';
  if (!values.dateOfBirth) errors.dateOfBirth = 'Enter a date of birth.';
  else if (!parseISO(values.dateOfBirth)) errors.dateOfBirth = 'Enter a valid date.';
  else if (values.dateOfBirth > todayISO()) errors.dateOfBirth = 'Date of birth cannot be in the future.';
  else if (values.dateOfBirth < '1900-01-01') errors.dateOfBirth = 'Enter a date after 1900.';
  if (!values.joinDate) errors.joinDate = 'Enter the date this member joined.';
  else if (!parseISO(values.joinDate)) errors.joinDate = 'Enter a valid date.';
  return errors;
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {required && <span className="text-red-600" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function MemberForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => ({
    ...BLANK_MEMBER,
    joinDate: todayISO(),
    ...initialValues,
  }));
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  const change = (e) => {
    const { name, value, type } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Date pickers rarely blur cleanly, so show their errors as soon as a value is chosen.
    if (type === 'date') setTouched((t) => ({ ...t, [name]: true }));
  };
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));
  const shown = (name) => (touched[name] ? errors[name] : undefined);

  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: change,
    onBlur: blur,
    'aria-invalid': shown(name) ? 'true' : undefined,
    'aria-describedby': shown(name) ? `${name}-error` : undefined,
    className: `input ${shown(name) ? 'input-error' : ''}`,
  });

  const submit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setTouched(Object.fromEntries(Object.keys(errors).map((k) => [k, true])));
      return;
    }
    onSubmit({
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: normalizePhone(values.phone),
      email: values.email.trim(),
      address: values.address.trim(),
      occupation: values.occupation.trim(),
      notes: values.notes.trim(),
    });
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <section className="card p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-navy-800">Personal details</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="firstName" label="First name" required error={shown('firstName')}>
            <input type="text" autoComplete="given-name" {...bind('firstName')} />
          </Field>
          <Field id="lastName" label="Last name" required error={shown('lastName')}>
            <input type="text" autoComplete="family-name" {...bind('lastName')} />
          </Field>
          <Field id="gender" label="Gender" required error={shown('gender')}>
            <select {...bind('gender')}>
              <option value="">Select gender</option>
              {GENDERS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field id="dateOfBirth" label="Date of birth" required error={shown('dateOfBirth')}>
            <input type="date" max={todayISO()} {...bind('dateOfBirth')} />
          </Field>
          <Field id="maritalStatus" label="Marital status" error={shown('maritalStatus')}>
            <select {...bind('maritalStatus')}>
              <option value="">Select marital status</option>
              {MARITAL_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field id="occupation" label="Occupation" error={shown('occupation')}>
            <input type="text" {...bind('occupation')} />
          </Field>
        </div>
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-navy-800">Contact</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="Phone" required error={shown('phone')}>
            <input type="tel" autoComplete="tel" placeholder="0803 123 4567" {...bind('phone')} />
          </Field>
          <Field id="email" label="Email" error={shown('email')}>
            <input type="email" autoComplete="email" placeholder="name@gmail.com" {...bind('email')} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="address" label="Address" error={shown('address')}>
              <input type="text" autoComplete="street-address" {...bind('address')} />
            </Field>
          </div>
        </div>
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-navy-800">Church life</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="department" label="Department" error={shown('department')}>
            <select {...bind('department')}>
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field id="cellGroup" label="Cell group" error={shown('cellGroup')}>
            <select {...bind('cellGroup')}>
              <option value="">No cell group yet</option>
              {CELL_GROUPS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field id="joinDate" label="Join date" required error={shown('joinDate')}>
            <input type="date" {...bind('joinDate')} />
          </Field>
          <Field id="status" label="Status" error={shown('status')}>
            <select {...bind('status')}>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field id="notes" label="Notes" error={shown('notes')}>
              <textarea rows={4} {...bind('notes')} />
            </Field>
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
        {!isValid && (
          <p className="text-sm text-navy-500 sm:mr-auto">Fill in the required fields (*) to continue.</p>
        )}
        <button type="button" className="btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={!isValid}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
