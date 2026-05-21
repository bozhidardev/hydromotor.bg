import React, { useState } from 'react';
import { IconMail, IconPhone } from './Icons';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

function ContactForm({ prefix = 'shared' }) {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [formMessage, setFormMessage] = useState(null); // { type: 'success'|'error'|'warning', text: '' }
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  if (!FORM_ENDPOINT) {
    return (
      <div className="contact-form contact-form-alt">
        <h3>Свържете се с нас</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Изпратете ни запитване за оферта, консултация или сервизен въпрос.
        </p>
        <div className="form-message form-message--warning">
          Формата изисква конфигурация. Моля, свържете се с нас на посочените телефони.
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
    if (!formData.contact.trim()) {
      newErrors.contact = 'Моля, въведете телефон или имейл за връзка.';
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
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        message: formData.message.trim(),
        _gotcha: '', // honeypot
        _subject: `Ново запитване от ${formData.name.trim()} — Хидромотор`,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormMessage({ type: 'success', text: '✅ Благодарим Ви! Съобщението беше изпратено успешно. Ще се свържем с вас скоро.' });
        setFormData({ name: '', contact: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setFormMessage({ type: 'error', text: data?.error || '❌ Възникна грешка. Моля, опитайте отново или се обадете на 0878 553 273.' });
      }
    } catch (err) {
      setFormMessage({ type: 'error', text: '❌ Възникна грешка при изпращането. Моля, проверете връзката си или се обадете на 0878 553 273.' });
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
        <label htmlFor={`contact-${prefix}`}>Телефон или имейл *</label>
        <input
          type="text"
          id={`contact-${prefix}`}
          name="contact"
          placeholder="Телефон или имейл за връзка"
          value={formData.contact}
          onChange={handleChange}
          className={errors.contact ? 'input-error' : ''}
        />
        {errors.contact && <span className="form-error">{errors.contact}</span>}
      </div>

      <div className="form-group">
        <label htmlFor={`message-${prefix}`}>Съобщение *</label>
        <textarea
          id={`message-${prefix}`}
          name="message"
          placeholder="Опишете вашия въпрос или заявете оферта за машина, резервни части или сервиз..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={errors.message ? 'input-error' : ''}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {/* Honeypot — hidden from users */}
      <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

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
