import React, { useState } from 'react';
import { IconMail } from './Icons';

function ContactForm({ prefix = 'shared' }) {
  const [formMessage, setFormMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormMessage('Формата временно не е активна. Моля, обадете се на 0878 553 273.');
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Напишете ни</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
        Свържете се с нас за оферта, консултация или сервизен въпрос.
      </p>
      <div className="form-group">
        <label htmlFor={`name-${prefix}`}>Име *</label>
        <input type="text" id={`name-${prefix}`} placeholder="Вашето име" required />
      </div>
      <div className="form-group">
        <label htmlFor={`contact-${prefix}`}>Телефон или имейл *</label>
        <input type="text" id={`contact-${prefix}`} placeholder="Телефон или имейл за връзка" required />
      </div>
      <div className="form-group">
        <label htmlFor={`message-${prefix}`}>Съобщение *</label>
        <textarea
          id={`message-${prefix}`}
          placeholder="Опишете вашия въпрос или заявете оферта за машина, резервни части или сервиз..."
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        <IconMail size={18} /> Изпрати съобщение
      </button>
      {formMessage && (
        <div className="form-notice">{formMessage}</div>
      )}
      <div className="contact-form-disclaimer">
        ⚠️ Формата за момента не е активна. Моля, обадете се на{' '}
        <a href="tel:0878553273" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>
          0878 553 273
        </a>
        .
      </div>
    </form>
  );
}

export default ContactForm;
