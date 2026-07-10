import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { webPageSchema } from '../utils/seoSchema';
import { asset } from '../data/assets';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Страницата не е намерена"
        description="Страницата, която търсите, не съществува или е преместена."
        noIndex
        jsonLd={[
          webPageSchema(
            'Страницата не е намерена',
            'Страницата, която търсите, не съществува или е преместена.'
          ),
        ]}
      />

      <main className="page-not-found cinema-page">
        <section className="page-error">
          <div className="page-error__media" aria-hidden="true">
            <img src={asset('images/cinematic/hero-industrial.webp')} alt="" />
          </div>
          <div className="page-error__shade" aria-hidden="true" />
          <div className="page-error__grid" aria-hidden="true" />
          <div className="container page-error__content">
            <span className="cinema-kicker cinema-reveal">Извън маршрута</span>
            <p className="page-error__code cinema-reveal" aria-label="Грешка 404">404</p>
            <h1 className="cinema-reveal">Страницата не е намерена</h1>
            <p className="page-error__lead cinema-reveal">
              Страницата, която търсите, не съществува или е преместена.
            </p>
            <nav className="page-error__actions cinema-reveal" aria-label="Полезни връзки">
              <Link to="/" className="btn btn-primary">Към началната страница</Link>
              <Link to="/mashini" className="btn btn-outline">Разгледайте машините</Link>
            </nav>
          </div>
          <span className="page-error__signal" aria-hidden="true">SIGNAL LOST / 404</span>
        </section>
      </main>
    </>
  );
}
