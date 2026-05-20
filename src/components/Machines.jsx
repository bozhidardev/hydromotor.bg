import React from 'react';
import { Link } from 'react-router-dom';
import { MACHINES } from '../data/machines';

function Machines() {
  const previewMachines = MACHINES.slice(0, 3);

  return (
    <section className="machines scroll-reveal" id="machines">
      <div className="container">
        <div className="section-header">
          <h2>Нашите машини</h2>
          <p>
            Автобетонпомпи Putzmeister и SANY — от 20 до 62 метра вертикален
            обхват.
          </p>
        </div>
        <div className="machines-grid">
          {previewMachines.map((machine) => (
            <Link
              to={`/mashini/${machine.slug}`}
              className="machine-card"
              key={machine.slug}
            >
              <div className="machine-card-icon">
                <img
                  src={machine.image}
                  alt={machine.name}
                  style={{
                    width: '100%',
                    height: '140px',
                    objectFit: 'cover',
                    borderRadius: '0.375rem',
                  }}
                />
              </div>
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
              {machine.specs && Object.keys(machine.specs).length > 0 && (
                <div className="machine-specs-chips">
                  {Object.values(machine.specs).slice(0, 3).map((spec, i) => (
                    <span key={i} className="spec-chip">{spec}</span>
                  ))}
                </div>
              )}
              <span className="machine-card-link">Научи повече →</span>
            </Link>
          ))}
        </div>
        <div className="section-link">
          <Link to="/mashini" className="btn btn-primary">
            Виж всички машини →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Machines;
