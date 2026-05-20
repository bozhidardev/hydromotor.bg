import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_TEXT, CONTACT } from '../data/content';
import { IconGraduationCap, IconPackage, IconTruck, IconAlertTriangle, IconSearch } from '../components/Icons';
import { asset } from '../data/assets';

export default function Services() {
  return (
    <section className="services-page">
      <div className="services-hero">
        <div className="container">
          <h1>Сервиз</h1>
          <p>Професионален сервиз за диагностика и ремонт</p>
        </div>
      </div>

      <div className="container services-content">
        <div className="service-main">
          <div className="service-intro">
            <p>{SERVICE_TEXT.intro}</p>
          </div>

          <div className="service-cards">
            <div className="service-card-full">
              <div className="service-card-icon"><IconGraduationCap size={24} /></div>
              <div>
                <h3>Сертифицирани инженери</h3>
                <p>{SERVICE_TEXT.training}</p>
              </div>
            </div>

            <div className="service-card-full">
              <div className="service-card-icon"><IconPackage size={24} /></div>
              <div>
                <h3>Складова наличност</h3>
                <p>{SERVICE_TEXT.spareParts}</p>
              </div>
            </div>

            <div className="service-card-full">
              <div className="service-card-icon"><IconAlertTriangle size={24} /></div>
              <div>
                <h3>24-часова доставка</h3>
                <p>{SERVICE_TEXT.expressDelivery}</p>
              </div>
            </div>

            <div className="service-card-full">
              <div className="service-card-icon"><IconSearch size={24} /></div>
              <div>
                <h3>Сервиз на място</h3>
                <p>{SERVICE_TEXT.mobileService}</p>
              </div>
            </div>
          </div>

          {/* TODO: Replace service-workshop.jpg with 1600×900 image */}
          <div className="service-workshop">
            <img
              src={asset('images/service-workshop.jpg')}
              alt="Сервизно хале на Хидромотор"
              className="service-workshop-image"
            />
          </div>

          <div className="service-247">
            <h3><IconAlertTriangle size={20} /> Телефон за сервизни услуги 24/7</h3>
            <div className="service-phones">
              <a href={`tel:${SERVICE_TEXT.phone247}`} className="service-phone-link">
                {SERVICE_TEXT.phone247}
              </a>
              <a href={`tel:${SERVICE_TEXT.phone247Alt}`} className="service-phone-link">
                {SERVICE_TEXT.phone247Alt}
              </a>
            </div>
          </div>
        </div>

        <div className="service-cta">
          <h3>Нуждаете се от сервизна помощ?</h3>
          <p>Обадете се на 24/7 линията или ни пишете за консултация.</p>
          <div className="service-cta-buttons">
            <Link to="/kontakti" className="btn btn-primary">
              Свържете се с нас
            </Link>
            <a href={`tel:${SERVICE_TEXT.phone247}`} className="btn btn-outline">
              <IconTruck size={18} /> {SERVICE_TEXT.phone247}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
