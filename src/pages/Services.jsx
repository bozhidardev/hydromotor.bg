import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { serviceSchema, webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { SERVICE_TEXT } from '../data/content';
import { asset } from '../data/assets';
import { IconAlertTriangle, IconGraduationCap, IconPackage, IconPhone, IconTruck } from '../components/Icons';

const capabilities = [
  { icon: IconGraduationCap, title: 'Инженерна подготовка', text: SERVICE_TEXT.training },
  { icon: IconPackage, title: 'Складова наличност', text: SERVICE_TEXT.spareParts },
  { icon: IconAlertTriangle, title: 'Спешна доставка', text: SERVICE_TEXT.expressDelivery },
  { icon: IconTruck, title: 'Ремонт на място', text: SERVICE_TEXT.mobileService },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Сервиз"
        description="Професионален сервиз за диагностика и ремонт на бетонпомпи и строителна техника. 24/7 аварийна помощ."
        canonical="/serviz"
        jsonLd={[
          serviceSchema(),
          webPageSchema('Сервиз', 'Професионален сервиз за диагностика и ремонт на бетонпомпи и строителна техника.', '/serviz'),
          breadcrumbSchema([{ name: 'Начало', url: '/' }, { name: 'Сервиз', url: '/serviz' }]),
        ]}
      />
      <main className="service-page cinema-page">
        <header className="service-hero">
          <div className="service-hero__media" data-parallax="32" aria-hidden="true">
            <img src={asset('images/cinematic/service-industrial.webp')} alt="" />
          </div>
          <div className="service-hero__shade" />
          <div className="service-hero__grid" />
          <div className="container service-hero__content">
            <span className="cinema-kicker cinema-kicker--light hero-enter hero-enter--1">СЕРВИЗ / 24 ЧАСА</span>
            <h1 className="hero-enter hero-enter--2">Връщаме машините<br /><em>в движение.</em></h1>
            <p className="hero-enter hero-enter--3">{SERVICE_TEXT.intro}</p>
            <div className="service-hero__actions hero-enter hero-enter--4">
              <a href="tel:0878553273" className="btn btn-emergency"><IconPhone size={17} /> 0878 553 273</a>
              <Link to="/kontakti" className="btn btn-ghost-light">Изпратете запитване</Link>
            </div>
          </div>
          <div className="service-hero__signal"><span className="status-dot status-dot--red" /> АВАРИЙНА ЛИНИЯ АКТИВНА</div>
        </header>

        <section className="service-capabilities cinema-section">
          <div className="container">
            <div className="section-heading section-heading--split cinema-reveal">
              <div><span className="cinema-kicker">СЕРВИЗНА СИСТЕМА</span><h2>Подкрепа на всяка стъпка.</h2></div>
              <p>От първоначалната диагностика до доставката на части и ремонта на място.</p>
            </div>
            <div className="capability-list">
              {capabilities.map(({ icon: Icon, title, text }, index) => (
                <article className="capability-row cinema-reveal" key={title}>
                  <span>0{index + 1}</span><Icon size={28} /><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-workflow cinema-section">
          <div className="container service-workflow__grid">
            <div className="service-workflow__visual cinema-image-reveal">
              <img src={asset('images/service-workshop.jpg')} alt="Сервизно оборудване на Хидромотор" loading="lazy" />
              <span>AUTHENTIC WORKSHOP IMAGE</span>
            </div>
            <div className="service-workflow__content">
              <span className="cinema-kicker cinema-kicker--light cinema-reveal">ПРОЦЕС</span>
              <h2 className="cinema-reveal">Точна диагностика.<br />Ясно действие.</h2>
              <ol>
                <li className="cinema-reveal"><span>01</span><div><h3>Свържете се с нас</h3><p>Опишете машината и проблема на сервизната линия.</p></div></li>
                <li className="cinema-reveal"><span>02</span><div><h3>Диагностика</h3><p>Определяме необходимия сервизен подход.</p></div></li>
                <li className="cinema-reveal"><span>03</span><div><h3>Ремонт</h3><p>В хале или на място при клиента.</p></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="service-emergency">
          <div className="container service-emergency__inner cinema-reveal">
            <div><span>24/7</span><div><small>АВАРИЙНА ПОДКРЕПА</small><h2>Проблем на обекта?</h2></div></div>
            <a href="tel:0878553273">0878 553 273 <span>↗</span></a>
          </div>
        </section>
      </main>
    </>
  );
}
