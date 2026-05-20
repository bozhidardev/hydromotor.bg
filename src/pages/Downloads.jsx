import React from 'react';
import { Link } from 'react-router-dom';
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
    file: '/pdfs/%D0%9C%D0%90%D0%99-%D0%9C%D0%90%D0%A8%D0%98%D0%9D%D0%98.pdf',
    size: '2.4 MB',
  },
];

export default function Downloads() {
  return (
    <section className="downloads-page">
      <div className="downloads-hero">
        <div className="container">
          <h1>Каталози</h1>
          <p>Изтеглете актуалните каталози и списъци на машини</p>
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
  );
}
