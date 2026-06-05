import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { productSchema, breadcrumbSchema } from '../utils/seoSchema';
import { MACHINES } from '../data/machines';
import { asset } from '../data/assets';

export default function MachineDetail() {
  const { slug } = useParams();
  const machine = MACHINES.find((m) => m.slug === slug);

  if (!machine) {
    return (
      <>
        <SEO
          title="Машината не е намерена"
          description="Търсената машина не съществува в нашия каталог."
          canonical={`/mashini/${slug}`}
          noIndex
        />
        <section className="machine-detail not-found">
          <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h1>Машината не е намерена</h1>
            <p>Машината с този адрес не съществува.</p>
            <Link to="/mashini" className="btn btn-primary">
              ← Към всички машини
            </Link>
          </div>
        </section>
      </>
    );
  }

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
            { name: 'Начало', url: '/' },
            { name: 'Машини', url: '/mashini' },
            { name: `${machine.brand} ${machine.name}`, url: `/mashini/${machine.slug}` },
          ]),
        ]}
      />
      <section className="machine-detail">
        <div className="page-hero">
          <div className="container">
            <Link to="/mashini" className="back-link">
              ← Към всички машини
            </Link>
            <span className="machine-detail-brand">{machine.brand}</span>
            <h1>{machine.name}</h1>
            <span className="machine-detail-category">{machine.category}</span>
          </div>
        </div>

        <div className="container">
          <div className="machine-detail-grid">
            <div className="machine-detail-gallery">
              <img
                src={asset(machine.image)}
                alt={`${machine.brand} ${machine.name}`}
                className="machine-detail-image"
              />
            </div>

            <div className="machine-detail-info">
              <h2>Описание</h2>
              <p className="machine-detail-description">{machine.description}</p>

              {machine.features && machine.features.length > 0 && (
                <>
                  <h3>Характеристики</h3>
                  <ul className="machine-detail-features">
                    {machine.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {machine.specs && Object.keys(machine.specs).length > 0 && (
            <div className="machine-detail-specs">
              <h2>Технически спецификации</h2>
              <table className="specs-table">
                <tbody>
                  {Object.entries(machine.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="specs-label">{key}</td>
                      <td className="specs-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="machine-detail-cta">
            <h3>Имате интерес към тази машина?</h3>
            <p>Свържете се с нас за оферта или консултация.</p>
            <Link to="/kontakti" className="btn btn-primary btn-lg">
              Поискай оферта
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
