import React from 'react';
import { Link } from 'react-router-dom';
import { MACHINES } from '../data/machines';
import { PUTZMEISTER_DESCRIPTION, SANY_DESCRIPTION } from '../data/content';

// TODO: All machine images (400×284) should be replaced with 800×600+ versions
export default function MachinesPage() {
  const putzmeisterMachines = MACHINES.filter((m) => m.brand === 'Putzmeister');
  const sanyMachines = MACHINES.filter((m) => m.brand === 'SANY');

  return (
    <section className="machines-page">
      <div className="machines-hero">
        <div className="container">
          <h1>Всички машини</h1>
          <p>Автобетонпомпи Putzmeister и SANY за всякакви строителни задачи</p>
        </div>
      </div>

      <div className="container">
        {/* Putzmeister Section */}
        <div className="brand-section">
          <h2 className="brand-title">
            {/* TODO: Replace putzmeister-p2.jpg with a proper brand logo image */}
            <img
              src="/images/putzmeister-p2.jpg"
              alt="Putzmeister"
              className="brand-logo-img"
            />
            Putzmeister
          </h2>
          <p className="brand-intro">{PUTZMEISTER_DESCRIPTION.intro}</p>
          <div className="machines-grid">
            {putzmeisterMachines.map((machine) => (
              <Link
                to={`/mashini/${machine.slug}`}
                className="machine-card"
                key={machine.slug}
              >
                <div className="machine-card-image">
                  <img src={machine.image} alt={machine.name} />
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

        {/* SANY Section */}
        <div className="brand-section">
          <h2 className="brand-title">
            SANY
          </h2>
          <p className="brand-intro">{SANY_DESCRIPTION.intro}</p>
          <div className="machines-grid">
            {sanyMachines.map((machine) => (
              <Link
                to={`/mashini/${machine.slug}`}
                className="machine-card"
                key={machine.slug}
              >
                <div className="machine-card-image">
                  <img src={machine.image} alt={machine.name} />
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
  );
}
