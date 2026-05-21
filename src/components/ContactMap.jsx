import React from 'react';
import { CONTACT } from '../data/content';
import { IconMapPin, IconPhone, IconAlertTriangle, IconMail } from './Icons';
import ContactForm from './ContactForm';

function ContactMap() {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23464.5!2d${CONTACT.gpsLng}!3d${CONTACT.gpsLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84a0bc4c3d8b%3A0x8b5b7a9e1f5e2b7a!2z0KHQvtGE0LjRjywg0JrRgNC40LLQuNC90LA!5e0!3m2!1sbg!2sbg!4v1`;

  return (
    <section className="contact-map scroll-reveal" id="contacts">
      <div className="container">
        <div className="section-header">
          <h2>Контакти</h2>
          <p>Свържете се с нас за оферта, консултация или сервиз</p>
        </div>
        <div className="contact-grid">
          <div>
            <div className="contact-info-list">
              <div className="contact-item">
                <span className="contact-item-icon"><IconMapPin size={20} /></span>
                <div>
                  <h4>Адрес</h4>
                  <p>{CONTACT.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon"><IconPhone size={20} /></span>
                <div>
                  <h4>Телефон</h4>
                  <p>
                    <a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>
                      {CONTACT.phones[0]}
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon"><IconAlertTriangle size={20} /></span>
                <div>
                  <h4>24/7 Аварийна помощ</h4>
                  <p>
                    <a href={`tel:${CONTACT.servicePhones[0].replace(/\s/g, '')}`}>
                      {CONTACT.servicePhones[0]}
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon"><IconMail size={20} /></span>
                <div>
                  <h4>Имейл</h4>
                  <p>
                    <a href={`mailto:${CONTACT.emails[1]}`}>
                      {CONTACT.emails[1]}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-map-container" style={{ marginTop: '1.5rem' }}>
              <iframe
                src={mapSrc}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hydromotor location"
              ></iframe>
            </div>
          </div>

          <div>
            <ContactForm prefix="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
