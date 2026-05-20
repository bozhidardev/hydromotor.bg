import React from 'react';
import { CONTACT } from '../data/content';
import { IconMapPin, IconPhone, IconAlertTriangle, IconMail, IconBuilding } from '../components/Icons';

export default function Contact() {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23464.5!2d${CONTACT.gpsLng}!3d${CONTACT.gpsLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84a0bc4c3d8b%3A0x8b5b7a9e1f5e2b7a!2z0KHQvtGE0LjRjywg0JrRgNC40LLQuNC90LA!5e0!3m2!1sbg!2sbg!4v1`;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('⚠️ Формата за момента не е активна. Моля, обадете се на 0878 553 273.');
  };

  return (
    <section className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Контакти</h1>
          <p>Свържете се с нас за оферта, консултация или сервиз</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-page-grid">
          <div className="contact-info-section">
            <div className="contact-info-list">
              <div className="contact-item">
                <span className="contact-item-icon"><IconMapPin size={20} /></span>
                <div>
                  <h4>Адрес</h4>
                  <p>{CONTACT.address}</p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon"><IconBuilding size={20} /></span>
                <div>
                  <h4>GPS координати</h4>
                  <p>
                    N {CONTACT.gpsLat} / E {CONTACT.gpsLng}
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon"><IconPhone size={20} /></span>
                <div>
                  <h4>Телефон</h4>
                  {CONTACT.phones.map((phone) => (
                    <p key={phone}>
                      <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon"><IconAlertTriangle size={20} /></span>
                <div>
                  <h4>Телефон за сервизни услуги 24/7</h4>
                  {CONTACT.servicePhones.map((phone) => (
                    <p key={phone}>
                      <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon"><IconMail size={20} /></span>
                <div>
                  <h4>Имейл</h4>
                  {CONTACT.emails.map((email) => (
                    <p key={email}>
                      <a href={`mailto:${email}`}>{email}</a>
                    </p>
                  ))}
                </div>
              </div>

              <div className="contact-item">
                <span className="contact-item-icon"><IconBuilding size={20} /></span>
                <div>
                  <h4>Facebook</h4>
                  <p>
                    <a
                      href={CONTACT.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Хидромотор ООД
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-map-container">
              <iframe
                src={mapSrc}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hydromotor location"
                style={{ width: '100%', height: '400px', border: 'none' }}
              ></iframe>
            </div>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Напишете ни</h3>
              <p>
                Свържете се с нас за оферта, консултация или сервизен въпрос.
              </p>
              <div className="form-group">
                <label htmlFor="name-page">Име *</label>
                <input
                  type="text"
                  id="name-page"
                  placeholder="Вашето име"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-page">Телефон или имейл *</label>
                <input
                  type="text"
                  id="contact-page"
                  placeholder="Телефон или имейл за връзка"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message-page">Съобщение *</label>
                <textarea
                  id="message-page"
                  placeholder="Опишете вашия въпрос или заявете оферта за машина, резервни части или сервиз..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <IconMail size={18} /> Изпрати съобщение
              </button>
              {/* TODO: Form needs a backend — email API or server endpoint */}
              <div className="contact-form-disclaimer">
                ⚠️ Формата за момента не е активна. Моля, обадете се на{' '}
                <a href="tel:0878553273" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>
                  0878 553 273
                </a>
                .
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
