import { useState } from 'react';

function todayString() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export default function BookingForm({ onSubmit, availableTimes = [] }) {
  const [values, setValues] = useState({ date: todayString(), time: '', guests: '2', occasion: 'No special occasion', name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: '' }));
  }

  function validate() {
    const next = {};
    if (!values.date) next.date = 'Please choose a date.';
    else if (values.date < todayString()) next.date = 'Please choose today or a future date.';
    if (!values.time) next.time = 'Please select a reservation time.';
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (!/^[+()\d\s-]{7,20}$/.test(values.phone)) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (validate()) onSubmit({ ...values, name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim(), guests: Number(values.guests) });
  }

  const error = name => errors[name] ? <span className="error" id={`${name}-error`}>{errors[name]}</span> : null;

  return <form onSubmit={submit} noValidate>
    <p className="eyebrow">Book online</p><h3>Find your table</h3>
    <div className="form-grid">
      <div className="field"><label htmlFor="date">Choose a date *</label><input id="date" name="date" type="date" min={todayString()} value={values.date} onChange={updateField} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined}/>{error('date')}</div>
      <div className="field"><label htmlFor="time">Choose a time *</label><select id="time" name="time" value={values.time} onChange={updateField} aria-invalid={!!errors.time} aria-describedby={errors.time ? 'time-error' : undefined}><option value="">Select a time</option>{availableTimes.map(time => <option key={time} value={time}>{time}</option>)}</select>{error('time')}</div>
      <div className="field"><label htmlFor="guests">Number of guests</label><select id="guests" name="guests" value={values.guests} onChange={updateField}>{Array.from({length:10},(_,i)=>i+1).map(n=><option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}</select></div>
      <div className="field"><label htmlFor="occasion">Occasion</label><select id="occasion" name="occasion" value={values.occasion} onChange={updateField}><option>No special occasion</option><option>Birthday</option><option>Anniversary</option><option>Engagement</option><option>Business meal</option></select></div>
      <div className="field span"><label htmlFor="name">Full name *</label><input id="name" name="name" value={values.name} onChange={updateField} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined}/>{error('name')}</div>
      <div className="field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" value={values.email} onChange={updateField} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email?'email-error':undefined}/>{error('email')}</div>
      <div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" type="tel" value={values.phone} onChange={updateField} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone?'phone-error':undefined}/>{error('phone')}</div>
    </div>
    <button className="button primary full" type="submit">Confirm reservation</button>
    <p className="note">Demo project: booking details are displayed here and are not sent to a live restaurant.</p>
  </form>;
}
