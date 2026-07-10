import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { MACHINES } from '../data/machines';
import { PUTZMEISTER_DESCRIPTION, SANY_DESCRIPTION } from '../data/content';
import { asset } from '../data/assets';
import { IconArrowUp } from '../components/Icons';

function featuredSpecs(machine) {
  const priority = ['Вертикален обхват', 'Брой рамене', 'Сгъване', 'Капацитет', 'Налягане'];
  return priority.filter((key) => machine.specs?.[key]).slice(0, 3).map((key) => [key, machine.specs[key]]);
}

export default function MachinesPage() {
  const [activeTab, setActiveTab] = useState('Всички');
  const filtered = activeTab === 'Всички' ? MACHINES : MACHINES.filter((machine) => machine.brand === activeTab);
  const intro = activeTab === 'Putzmeister'
    ? PUTZMEISTER_DESCRIPTION.intro
    : activeTab === 'SANY'
      ? SANY_DESCRIPTION.intro
      : 'Пълна гама автобетонпомпи Putzmeister и SANY — от компактни машини до решения за мащабни строителни проекти.';

  return (
    <>
      <SEO
        title="Всички машини"
        description="Автобетонпомпи Putzmeister и SANY за всякакви строителни задачи. Продажба на нови и употребявани машини с гаранция и сервиз."
        canonical="/mashini"
        jsonLd={[
          webPageSchema('Всички машини', 'Автобетонпомпи Putzmeister и SANY за всякакви строителни задачи.', '/mashini'),
          breadcrumbSchema([{ name: 'Начало', url: '/' }, { name: 'Машини', url: '/mashini' }]),
        ]}
      />
      <main className="cinema-page machines-catalog">
        <header className="catalog-hero">
          <div className="catalog-hero__media" data-parallax="28" aria-hidden="true">
            <img src={asset('images/cinematic/hero-industrial.webp')} alt="" />
          </div>
          <div className="catalog-hero__shade" />
          <div className="catalog-hero__grid" />
          <div className="container catalog-hero__content">
            <span className="cinema-kicker cinema-kicker--light hero-enter hero-enter--1">КАТАЛОГ / 07 МАШИНИ</span>
            <h1 className="hero-enter hero-enter--2">Машини за<br /><em>реална работа.</em></h1>
            <p className="hero-enter hero-enter--3">Автобетонпомпи Putzmeister и SANY за строителни задачи от всеки мащаб.</p>
          </div>
          <span className="catalog-hero__index">PRODUCT SYSTEMS / BG</span>
        </header>

        <section className="catalog-section cinema-section">
          <div className="container">
            <div className="catalog-filter cinema-reveal" role="group" aria-label="Филтър по марка">
              <span>ФИЛТРИРАЙ ПО МАРКА</span>
              <div>
                {['Всички', 'Putzmeister', 'SANY'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={activeTab === tab ? 'is-active' : ''}
                    onClick={() => setActiveTab(tab)}
                    aria-pressed={activeTab === tab}
                  >
                    {tab} <small>{tab === 'Всички' ? MACHINES.length : MACHINES.filter((machine) => machine.brand === tab).length}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-intro cinema-reveal">
              <span>{activeTab === 'Всички' ? 'Putzmeister + SANY' : activeTab}</span>
              <p>{intro}</p>
            </div>

            <div className="catalog-grid" key={activeTab}>
              {filtered.map((machine, index) => (
                <Link
                  to={`/mashini/${machine.slug}`}
                  className={`catalog-machine${index % 3 === 0 ? ' catalog-machine--wide' : ''}`}
                  style={{ '--card-index': index }}
                  key={machine.slug}
                >
                  <div className="catalog-machine__media">
                    <img src={asset(machine.image)} alt={`${machine.brand} ${machine.name}`} loading="lazy" />
                    <span>0{index + 1}</span>
                  </div>
                  <div className="catalog-machine__content">
                    <div className="catalog-machine__meta"><span>{machine.brand}</span><span>{machine.category}</span></div>
                    <h2>{machine.name}</h2>
                    <p>{machine.description}</p>
                    <dl>
                      {featuredSpecs(machine).map(([key, value]) => (
                        <div key={key}><dt>{key}</dt><dd>{value}</dd></div>
                      ))}
                    </dl>
                    <span className="catalog-machine__link">Технически детайли <IconArrowUp size={18} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
