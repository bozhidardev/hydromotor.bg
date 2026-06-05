import React from 'react';
import SEO from '../components/SEO';
import { localBusinessSchema, webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { CONTACT } from '../data/content';
import { IconMapPin, IconPhone, IconAlertTriangle, IconMail, IconBuilding } from '../components/Icons';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23464.5!2d${CONTACT.gpsLng}!3d${CONTACT.gpsLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84a0bc4c3d8b%3A0x8b5b7a9e1f5e2b7a!2z0KHQvtGE0LjRjywg0JrRgNC40LLQuNC90LA!5e0!3m2!1sbg!2sbg!4v1`;

  return (
    <>
      <SEO
        title="Контакти"
        description="Свържете се с Хидромотор ООД за оферта, консултация или сервиз. Адрес: София 1588, с. Кривина. Телефон: 02 / 999 75 06."
        canonical="/kontakti"
        jsonLd={[
          localBusinessSchema(),
          webPageSchema(
            'Контакти',
            'Свържете се с Хидромотор ООД за оферта, консултация или сервиз. Адрес: София 1588, с. Кривина. Телефон: 02 / 999 75 06.',
            '/kontakti'
          ),
          breadcrumbSchema([
            { name: 'Начало', url: '/' },
            { name: 'Контакти', url: '/kontakti' },
          ]),
        ]}
      />
      <section className="contact-page">
        <div className="page-hero">
          <div className="container">
            <h1>Контакти</h1>
            <p className="page-hero-subtitle">Свържете се с нас за оферта, консултация или сервиз</p>
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
                    <p>N {CONTACT.gpsLat} / E {CONTACT.gpsLng}</p>
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
              <ContactForm prefix="page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
