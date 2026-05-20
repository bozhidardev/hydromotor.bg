import React from 'react';
import { Link } from 'react-router-dom';
import { IconSearch, IconGraduationCap, IconTruck } from './Icons';

const serviceItems = [
  {
    icon: IconSearch,
    title: 'Диагностика и ремонт',
    description:
      'Пълна диагностика на хидравлични системи и двигатели. Ремонт на бетонпомпи, тунелни машини и промишлено оборудване.',
  },
  {
    icon: IconGraduationCap,
    title: 'Сертифицирани инженери',
    description:
      'Нашите инженери преминават ежегодни курсове в Германия и притежават сертификати за диагностика и ремонт.',
  },
  {
    icon: IconTruck,
    title: 'Ремонт на място',
    description:
      'Мобилни сервизни екипи, оборудвани за бърза намеса на вашия обект във всяка точка на България.',
  },
];

function Services() {
  return (
    <section className="services scroll-reveal section-diagonal-reverse" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Професионален сервиз и поддръжка</h2>
          <p>
            Отлично оборудван сервиз за диагностика и ремонт на предлаганите
            машини.
          </p>
        </div>
        <div className="services-grid">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <div className="service-card" key={index}>
                <span className="service-card-icon"><Icon size={32} /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>
        <div className="section-link">
          <Link to="/serviz" className="btn btn-outline">
            Виж всички услуги →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
