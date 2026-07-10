import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { productSchema, breadcrumbSchema } from '../utils/seoSchema';
import { MACHINES } from '../data/machines';
import { asset } from '../data/assets';
import { IconPhone } from '../components/Icons';

export default function MachineDetail() {
  const { slug } = useParams();
  const machine = MACHINES.find((item) => item.slug === slug);

  if (!machine) {
    return (
      <main className="detail-missing">
        <SEO title="Машината не е намерена" description="Търсената машина не съществува в нашия каталог." canonical={`/mashini/${slug}`} noIndex />
        <span className="cinema-kicker">404 / КАТАЛОГ</span>
        <h1>Машината не е намерена.</h1>
        <Link to="/mashini" className="btn btn-primary">Към каталога</Link>
      </main>
    );
  }

  const entries = Object.entries(machine.specs || {});
  const quickSpecs = entries.slice(0, 4);

  return (
    <>
      <SEO
        title={`${machine.brand} ${machine.name}`}
        description={machine.description}
        canonical={`/mashini/${machine.slug}`}
        ogImage={`https://hydromotor.bg${machine.image}`}
        ogType="product"
        jsonLd={[
          productSchema(machine),
          breadcrumbSchema([
            { name: 'Начало', url: '/' }, { name: 'Машини', url: '/mashini' },
            { name: `${machine.brand} ${machine.name}`, url: `/mashini/${machine.slug}` },
          ]),
        ]}
      />
      <main className="machine-product cinema-page">
        <header className="product-hero">
          <div className="product-hero__grid" aria-hidden="true" />
          <div className="container product-hero__layout">
            <div className="product-hero__copy">
              <Link to="/mashini" className="product-back hero-enter hero-enter--1">← Към каталога</Link>
              <span className="cinema-kicker cinema-kicker--light hero-enter hero-enter--1">{machine.brand} / {machine.category}</span>
              <h1 className="hero-enter hero-enter--2">{machine.name}</h1>
              <p className="hero-enter hero-enter--3">{machine.description}</p>
              <div className="product-hero__actions hero-enter hero-enter--4">
                <Link to="/kontakti" className="btn btn-primary">Поискайте оферта <span>↗</span></Link>
                <a href="tel:0878553273" className="btn btn-ghost-light"><IconPhone size={16} /> Консултация</a>
              </div>
            </div>
            <div className="product-hero__machine cinema-image-reveal">
              <span className="product-hero__halo" />
              <img src={asset(machine.image)} alt={`${machine.brand} ${machine.name}`} />
              <span className="product-hero__label">CATALOGUE IMAGE / {machine.slug.toUpperCase()}</span>
            </div>
          </div>
          <div className="container product-quick-specs">
            {quickSpecs.map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}
          </div>
        </header>

        <section className="product-story cinema-section">
          <div className="container product-story__grid">
            <div className="cinema-reveal">
              <span className="cinema-kicker">ПРЕГЛЕД</span>
              <h2>Проектирана за производителност.</h2>
            </div>
            <div className="product-story__copy cinema-reveal">
              <p>{machine.description}</p>
              {machine.features?.length > 0 && (
                <ul>{machine.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              )}
            </div>
          </div>
        </section>

        {entries.length > 0 && (
          <section className="product-specifications cinema-section">
            <div className="container">
              <div className="section-heading section-heading--split cinema-reveal">
                <div><span className="cinema-kicker cinema-kicker--light">ТЕХНИЧЕСКИ ДАННИ</span><h2>Спецификации.</h2></div>
                <span className="product-specifications__count">{String(entries.length).padStart(2, '0')} ПАРАМЕТЪРА</span>
              </div>
              <dl className="technical-list">
                {entries.map(([key, value], index) => (
                  <div className="cinema-reveal" key={key}><span>{String(index + 1).padStart(2, '0')}</span><dt>{key}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            </div>
          </section>
        )}

        <section className="product-contact cinema-reveal">
          <div className="container product-contact__inner">
            <div><span className="cinema-kicker">КОНСУЛТАЦИЯ</span><h2>Тази машина отговаря ли на проекта ви?</h2></div>
            <div><p>Ще ви помогнем да изберете правилната конфигурация.</p><Link to="/kontakti" className="btn btn-primary">Свържете се с инженер</Link></div>
          </div>
        </section>
      </main>
    </>
  );
}
