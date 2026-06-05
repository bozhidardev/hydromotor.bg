import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { collectionPageSchema, webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { IconPdf } from '../components/Icons';

const catalogs = [
  {
    title: 'Maschinenliste 2022',
    description:
      'Списък на употребявани машини — актуален каталог с наличната техника.',
    file: '/pdfs/Maschinenliste.pdf',
    size: '162 KB',
  },
  {
    title: 'МАЙ-МАШИНИ 2020',
    description: 'Каталог на машините — 2020 г.',
    file: '/pdfs/maj-mashini-2020.pdf',
    size: '2.4 MB',
  },
];

export default function Downloads() {
  return (
    <>
      <SEO
        title="Каталози"
        description="Изтеглете актуалните каталози и списъци на машини от Хидромотор. Каталози на Putzmeister и SANY машини."
        canonical="/katalozi"
        jsonLd={[
          collectionPageSchema('Каталози', 'Изтеглете актуалните каталози и списъци на машини от Хидромотор.', '/katalozi'),
          webPageSchema(
            'Каталози',
            'Изтеглете актуалните каталози и списъци на машини от Хидромотор. Каталози на Putzmeister и SANY машини.',
            '/katalozi'
          ),
          breadcrumbSchema([
            { name: 'Начало', url: '/' },
            { name: 'Каталози', url: '/katalozi' },
          ]),
        ]}
      />
      <section className="downloads-page">
        <div className="page-hero">
          <div className="container">
            <h1>Каталози</h1>
            <p className="page-hero-subtitle">Изтеглете актуалните каталози и списъци на машини</p>
          </div>
        </div>

        <div className="container">
          <div className="downloads-grid">
            {catalogs.map((catalog, index) => (
              <div className="download-card" key={index}>
                <div className="download-card-icon"><IconPdf size={36} /></div>
                <div className="download-card-body">
                  <h3>{catalog.title}</h3>
                  <p>{catalog.description}</p>
                  <span className="download-card-size">{catalog.size}</span>
                </div>
                <a
                  href={catalog.file}
                  className="btn btn-primary"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Изтегли PDF ↓
                </a>
              </div>
            ))}
          </div>

          <div className="downloads-note">
            <p>
              За повече информация относно наличните машини и оборудване, моля
              свържете се с нас.
            </p>
            <Link to="/kontakti" className="btn btn-outline">
              Свържете се с нас
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
