import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { collectionPageSchema, webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { IconPdf } from '../components/Icons';
import { asset } from '../data/assets';

const catalogs = [
  {
    title: 'Maschinenliste 2022',
    description: 'Списък на употребявани машини — актуален каталог с наличната техника.',
    file: 'pdfs/Maschinenliste.pdf',
    size: '162 KB',
    year: '2022',
  },
  {
    title: 'МАЙ-МАШИНИ 2020',
    description: 'Каталог на машините — 2020 г.',
    file: 'pdfs/maj-mashini-2020.pdf',
    size: '2.4 MB',
    year: '2020',
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
          collectionPageSchema(
            'Каталози',
            'Изтеглете актуалните каталози и списъци на машини от Хидромотор.',
            '/katalozi'
          ),
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

      <main className="page-downloads cinema-page">
        <header className="page-cinema-hero page-cinema-hero--downloads">
          <div className="page-cinema-hero__media" aria-hidden="true">
            <img src={asset('images/cinematic/catalog-industrial.webp')} alt="" />
          </div>
          <div className="page-cinema-hero__shade" aria-hidden="true" />
          <div className="page-cinema-hero__grid" aria-hidden="true" />
          <div className="container page-cinema-hero__content">
            <span className="cinema-kicker cinema-reveal">Техническа библиотека</span>
            <h1 className="cinema-title cinema-reveal">Каталози</h1>
            <p className="page-cinema-hero__lead cinema-reveal">
              Изтеглете актуалните каталози и списъци на машини.
            </p>
          </div>
          <span className="page-cinema-hero__index" aria-hidden="true">02 / PDF</span>
        </header>

        <section className="page-library cinema-section">
          <div className="container">
            <div className="page-section-heading page-section-heading--split cinema-reveal">
              <div>
                <span className="cinema-kicker">Документи</span>
                <h2>Каталози за директно изтегляне.</h2>
              </div>
              <p>Информация за предлагани и употребявани машини в удобен PDF формат.</p>
            </div>

            <div className="page-library__list">
              {catalogs.map((catalog, index) => (
                <article className="page-catalog-card cinema-reveal" key={catalog.file}>
                  <div className="page-catalog-card__cover" aria-hidden="true">
                    <span className="page-catalog-card__mark">HM</span>
                    <IconPdf size={44} />
                    <span>PDF / {catalog.year}</span>
                  </div>
                  <div className="page-catalog-card__body">
                    <span className="page-catalog-card__index">Каталог 0{index + 1}</span>
                    <h3>{catalog.title}</h3>
                    <p>{catalog.description}</p>
                    <dl className="page-catalog-card__meta">
                      <div><dt>Формат</dt><dd>PDF</dd></div>
                      <div><dt>Размер</dt><dd>{catalog.size}</dd></div>
                      <div><dt>Година</dt><dd>{catalog.year}</dd></div>
                    </dl>
                  </div>
                  <a
                    href={asset(catalog.file)}
                    className="btn btn-primary page-catalog-card__action"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Изтегли PDF <span aria-hidden="true">↓</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-cinema-cta page-cinema-cta--compact cinema-reveal">
          <div className="container page-cinema-cta__inner">
            <div>
              <span className="cinema-kicker">Нужна ви е повече информация?</span>
              <h2>Попитайте за налична техника и оборудване.</h2>
            </div>
            <Link to="/kontakti" className="btn btn-outline">Свържете се с нас</Link>
          </div>
        </section>
      </main>
    </>
  );
}
