import React from 'react';
import SEO from '../components/SEO';
import { localBusinessSchema, webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { CONTACT } from '../data/content';
import ContactForm from '../components/ContactForm';
import { asset } from '../data/assets';
import { IconAlertTriangle, IconMail, IconMapPin, IconPhone } from '../components/Icons';

export default function Contact() {
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23464.5!2d${CONTACT.gpsLng}!3d${CONTACT.gpsLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa84a0bc4c3d8b%3A0x8b5b7a9e1f5e2b7a!2z0KHQvtGE0LjRjywg0JrRgNC40LLQuNC90LA!5e0!3m2!1sbg!2sbg!4v1`;

  return (
    <>
      <SEO
        title="Контакти"
        description="Свържете се с Хидромотор ООД за оферта, консултация или сервиз. Адрес: София 1588, с. Кривина."
        canonical="/kontakti"
        jsonLd={[
          localBusinessSchema(),
          webPageSchema('Контакти', 'Свържете се с Хидромотор ООД за оферта, консултация или сервиз.', '/kontakti'),
          breadcrumbSchema([{ name: 'Начало', url: '/' }, { name: 'Контакти', url: '/kontakti' }]),
        ]}
      />
      <main className="contact-cinema cinema-page">
        <header className="contact-hero">
          <div className="contact-hero__media" data-parallax="26" aria-hidden="true">
            <img src={asset('images/cinematic/contact-industrial.webp')} alt="" />
          </div>
          <div className="contact-hero__shade" />
          <div className="contact-hero__grid" />
          <div className="container contact-hero__content">
            <span className="cinema-kicker cinema-kicker--light hero-enter hero-enter--1">СОФИЯ / БЪЛГАРИЯ</span>
            <h1 className="hero-enter hero-enter--2">Да започнем<br /><em>разговор.</em></h1>
            <p className="hero-enter hero-enter--3">За оферта, техническа консултация или сервизен въпрос.</p>
          </div>
        </header>

        <section className="contact-dashboard cinema-section">
          <div className="container contact-dashboard__grid">
            <div className="contact-dashboard__info">
              <div className="section-heading cinema-reveal"><span className="cinema-kicker">ДИРЕКТЕН КОНТАКТ</span><h2>Изберете най-бързия канал.</h2></div>
              <div className="contact-channels">
                <a href={`tel:${CONTACT.servicePhones[0].replace(/\s/g, '')}`} className="contact-channel contact-channel--urgent cinema-reveal">
                  <IconAlertTriangle size={24} /><span><small>24/7 СЕРВИЗ</small><strong>{CONTACT.servicePhones[0]}</strong></span><b>↗</b>
                </a>
                <div className="contact-channel cinema-reveal">
                  <IconPhone size={24} /><span><small>ТЕЛЕФОНИ</small>{CONTACT.phones.map((phone) => <a href={`tel:${phone.replace(/\s/g, '')}`} key={phone}>{phone}</a>)}</span>
                </div>
                <div className="contact-channel cinema-reveal">
                  <IconMail size={24} /><span><small>ИМЕЙЛ</small>{CONTACT.emails.map((email) => <a href={`mailto:${email}`} key={email}>{email}</a>)}</span>
                </div>
                <div className="contact-channel cinema-reveal">
                  <IconMapPin size={24} /><span><small>АДРЕС</small><strong>{CONTACT.address}</strong><em>N {CONTACT.gpsLat} / E {CONTACT.gpsLng}</em></span>
                </div>
              </div>
            </div>
            <div className="contact-dashboard__form cinema-reveal"><ContactForm prefix="page" /></div>
          </div>
        </section>

        <section className="contact-map cinema-section">
          <div className="container">
            <div className="section-heading section-heading--split cinema-reveal">
              <div><span className="cinema-kicker cinema-kicker--light">ЛОКАЦИЯ</span><h2>Намерете ни в Кривина.</h2></div>
              <span>N {CONTACT.gpsLat} / E {CONTACT.gpsLng}</span>
            </div>
            <div className="contact-map__frame cinema-image-reveal">
              <iframe src={mapSrc} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Местоположение на Хидромотор" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
