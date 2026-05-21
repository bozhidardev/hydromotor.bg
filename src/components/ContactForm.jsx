import React, { useState } from 'react';
import { IconMail, IconPhone } from './Icons';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

function ContactForm({ prefix = 'shared' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formMessage, setFormMessage] = useState(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  if (!ACCESS_KEY) {
    return (
      <div className="contact-form contact-form-alt">
        <h3>Свържете се с нас</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Изпратете ни запитване за оферта, консултация или сервизен въпрос.
        </p>
        <div className="form-message form-message--warning">
          Функцията за изпращане на запитвания временно не е активна. Моля, използвайте телефона или имейла по-долу.
        </div>
        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <a href="tel:0878553273" className="btn btn-emergency" style={{ width: '100%', maxWidth: '280px' }}>
            <IconPhone size={18} /> 0878 553 273 — 24/7
          </a>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Моля, въведете име (минимум 2 символа).';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Моля, въведете телефон за връзка.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Моля, въведете валиден имейл адрес.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Моля, въведете съобщение (минимум 10 символа).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(null);
    if (!validate()) return;

    setSending(true);
    try {
      const payload = {
        access_key: ACCESS_KEY,
        subject: 'Ново запитване от hydromotor.bg',
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        from_name: formData.name.trim(),
        _honeypot: '',
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        setFormMessage({ type: 'success', text: '✅ Благодарим Ви. Запитването беше изпратено успешно.' });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setFormMessage({ type: 'error', text: '❌ Възникна проблем при изпращането. Моля, опитайте отново или се свържете с нас по телефон.' });
      }
    } catch (err) {
      setFormMessage({ type: 'error', text: '❌ Възникна проблем при изпращането. Моля, опитайте отново или се свържете с нас по телефон.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h3>Изпратете запитване</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        Свържете се с нас за оферта, консултация или сервизен въпрос.
      </p>

      <div className="form-group">
        <label htmlFor={`name-${prefix}`}>Име *</label>
        <input
          type="text"
          id={`name-${prefix}`}
          name="name"
          placeholder="Вашето име"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor={`phone-${prefix}`}>Телефон *</label>
        <input
          type="tel"
          id={`phone-${prefix}`}
          name="phone"
          placeholder="Телефон за връзка"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'input-error' : ''}
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor={`email-${prefix}`}>Имейл *</label>
        <input
          type="email"
          id={`email-${prefix}`}
          name="email"
          placeholder="Имейл адрес"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor={`message-${prefix}`}>Съобщение *</label>
        <textarea
          id={`message-${prefix}`}
          name="message"
          placeholder="Опишете вашия въпрос или заявете оферта..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={errors.message ? 'input-error' : ''}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {/* Honeypot — hidden from users */}
      <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={sending}>
        {sending ? 'Изпращане...' : <><IconMail size={18} /> Изпрати съобщение</>}
      </button>

      {formMessage && (
        <div className={`form-message form-message--${formMessage.type}`}>
          {formMessage.text}
        </div>
      )}

      <div className="contact-form-phone-alt" style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        Или се обадете: <a href="tel:0878553273" style={{ color: 'var(--color-emergency)', fontWeight: 700, textDecoration: 'underline' }}>0878 553 273</a> (24/7)
      </div>
    </form>
  );
}

export default ContactForm;
