import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, SELLING_POINTS } from '../data/content';
import { asset } from '../data/assets';

export default function About() {
  return (
    <section className="about-page">
      <div className="page-hero">
        <div className="container">
          <h1>За нас</h1>
          <p className="page-hero-subtitle">{COMPANY.slogan}</p>
        </div>
      </div>

      <div className="container about-content section-light-spacing">
        <div className="about-intro">
          <h2>Фирма "Хидромотор" ООД</h2>
          <p className="about-description">{COMPANY.description}</p>
          <p className="about-description">{COMPANY.serviceDescription}</p>
        </div>

        <div className="about-key-points">
          <h3>Защо да изберете нас?</h3>
          <div className="about-points-grid">
            {SELLING_POINTS.map((point, index) => (
              <div className="about-point" key={index}>
                <h4>{point.title}</h4>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-images">
          {/* TODO: Replace about-img-1.jpg with 1200×600+ image */}
          <img
            src={asset('images/about-img-1.jpg')}
            alt="Хидромотор сервиз"
            className="about-image"
            loading="lazy"
          />
          {/* TODO: Replace about-img-2.jpg with 1200×600+ image */}
          <img
            src={asset('images/about-img-2.jpg')}
            alt="Хидромотор оборудване"
            className="about-image"
            loading="lazy"
          />
        </div>

        <div className="about-cta">
          <h3>Нуждаете се от консултация?</h3>
          <p>Свържете се с нас за оферта или сервизен въпрос.</p>
          <div className="about-cta-buttons">
            <Link to="/kontakti" className="btn btn-primary">
              Свържете се с нас
            </Link>
            <Link to="/mashini" className="btn btn-outline">
              Разгледайте машините
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
