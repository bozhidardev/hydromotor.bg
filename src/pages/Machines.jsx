import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { MACHINES } from '../data/machines';
import { PUTZMEISTER_DESCRIPTION, SANY_DESCRIPTION } from '../data/content';
import { asset } from '../data/assets';

export default function MachinesPage() {
  const putzmeisterMachines = MACHINES.filter((m) => m.brand === 'Putzmeister');
  const sanyMachines = MACHINES.filter((m) => m.brand === 'SANY');

  return (
    <>
      <SEO
        title="Всички машини"
        description="Автобетонпомпи Putzmeister и SANY за всякакви строителни задачи. Продажба на нови и употребявани машини с гаранция и сервиз."
        canonical="/mashini"
        jsonLd={[
          webPageSchema(
            'Всички машини',
            'Автобетонпомпи Putzmeister и SANY за всякакви строителни задачи. Продажба на нови и употребявани машини с гаранция и сервиз.',
            '/mashini'
          ),
          breadcrumbSchema([
            { name: 'Начало', url: '/' },
            { name: 'Машини', url: '/mashini' },
          ]),
        ]}
      />
      <section className="machines-page">
        <div className="page-hero">
          <div className="container">
            <h1>Всички машини</h1>
            <p className="page-hero-subtitle">Автобетонпомпи Putzmeister и SANY за всякакви строителни задачи</p>
          </div>
        </div>

        <div className="container">
          <div className="brand-section">
            <h2 className="brand-title">Putzmeister</h2>
            <p className="brand-intro">{PUTZMEISTER_DESCRIPTION.intro}</p>
            <div className="machines-grid">
              {putzmeisterMachines.map((machine) => (
                <Link
                  to={`/mashini/${machine.slug}`}
                  className="machine-card"
                  key={machine.slug}
                >
                  <div className="machine-card-image">
                    <img src={asset(machine.image)} alt={machine.name} loading="lazy" />
                  </div>
                  <div className="machine-card-body">
                    <span className="machine-card-brand">{machine.brand}</span>
                    <h3>{machine.name}</h3>
                    <span className="machine-card-category">
                      {machine.category}
                    </span>
                    <p>{machine.description}</p>
                    <span className="machine-card-link">Виж детайли →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="brand-section">
            <h2 className="brand-title">SANY</h2>
            <p className="brand-intro">{SANY_DESCRIPTION.intro}</p>
            <div className="machines-grid">
              {sanyMachines.map((machine) => (
                <Link
                  to={`/mashini/${machine.slug}`}
                  className="machine-card"
                  key={machine.slug}
                >
                  <div className="machine-card-image">
                    <img src={asset(machine.image)} alt={machine.name} loading="lazy" />
                  </div>
                  <div className="machine-card-body">
                    <span className="machine-card-brand">{machine.brand}</span>
                    <h3>{machine.name}</h3>
                    <span className="machine-card-category">
                      {machine.category}
                    </span>
                    <p>{machine.description}</p>
                    <span className="machine-card-link">Виж детайли →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
