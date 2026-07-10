import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { organizationSchema, webPageSchema, breadcrumbSchema } from '../utils/seoSchema';
import { COMPANY, SELLING_POINTS } from '../data/content';
import { asset } from '../data/assets';
import { IconFactory, IconHandshake, IconPackage, IconShield } from '../components/Icons';

const pointIcons = [IconFactory, IconHandshake, IconPackage, IconShield];

export default function About() {
  return (
    <>
      <SEO
        title="За нас"
        description="Фирма Хидромотор ООД — официален представител на Putzmeister в България от 1998 г. Ремонт, поддръжка и продажба на строителна техника."
        canonical="/za-nas"
        jsonLd={[
          organizationSchema(),
          webPageSchema(
            'За нас',
            'Фирма Хидромотор ООД — официален представител на Putzmeister в България от 1998 г. Ремонт, поддръжка и продажба на строителна техника.',
            '/za-nas'
          ),
          breadcrumbSchema([
            { name: 'Начало', url: '/' },
            { name: 'За нас', url: '/za-nas' },
          ]),
        ]}
      />

      <main className="page-about cinema-page">
        <header className="page-cinema-hero page-cinema-hero--about">
          <div className="page-cinema-hero__media" aria-hidden="true">
            <img src={asset('images/cinematic/heritage-industrial.webp')} alt="" />
          </div>
          <div className="page-cinema-hero__shade" aria-hidden="true" />
          <div className="page-cinema-hero__grid" aria-hidden="true" />
          <div className="container page-cinema-hero__content">
            <span className="cinema-kicker cinema-reveal">История и партньорство</span>
            <h1 className="cinema-title cinema-reveal">За нас</h1>
            <p className="page-cinema-hero__lead cinema-reveal">{COMPANY.slogan}</p>
            <div className="page-cinema-hero__facts cinema-reveal" aria-label="Ключови години">
              <div className="page-fact">
                <strong>{COMPANY.founded}</strong>
                <span>създадена компанията</span>
              </div>
              <div className="page-fact">
                <strong>{COMPANY.putzmeisterRepSince}</strong>
                <span>представител на Putzmeister</span>
              </div>
            </div>
          </div>
          <span className="page-cinema-hero__index" aria-hidden="true">01 / ЗА НАС</span>
        </header>

        <section className="page-story cinema-section">
          <div className="container page-story__layout">
            <div className="page-story__heading cinema-reveal">
              <span className="cinema-kicker">Хидромотор ООД</span>
              <h2>Опит, който държи машините в движение.</h2>
            </div>
            <div className="page-story__copy cinema-reveal">
              <p>{COMPANY.description}</p>
              <p>{COMPANY.serviceDescription}</p>
            </div>
          </div>
        </section>

        <section className="page-history cinema-section cinema-section--dark">
          <div className="container page-history__layout">
            <div className="page-history__visual cinema-image-reveal">
              <img
                src={asset('images/about-img-1.jpg')}
                alt="Хидромотор"
                loading="lazy"
              />
              <span className="page-history__visual-label">Сервиз и оборудване</span>
            </div>

            <div className="page-history__timeline">
              <div className="page-history__intro cinema-reveal">
                <span className="cinema-kicker">Нашият път</span>
                <h2>Дългосрочно присъствие. Локална подкрепа.</h2>
              </div>
              <article className="page-history__event cinema-reveal">
                <span className="page-history__year">1996</span>
                <div>
                  <h3>Началото</h3>
                  <p>„Хидромотор“ ООД е създадена с предмет на дейност ремонт и поддръжка на строителна техника.</p>
                </div>
              </article>
              <article className="page-history__event cinema-reveal">
                <span className="page-history__year">1998</span>
                <div>
                  <h3>Партньорство с Putzmeister</h3>
                  <p>Компанията става официален търговски представител за България за бетонпомпи, тунелни машини, промишлени помпи и разпределителни стрели.</p>
                </div>
              </article>
              <article className="page-history__event cinema-reveal">
                <span className="page-history__year">Днес</span>
                <div>
                  <h3>Подкрепа в цяла България</h3>
                  <p>Ремонт в оборудвано хале, складова наличност и сервиз на място при клиента.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-values cinema-section">
          <div className="container">
            <div className="page-section-heading cinema-reveal">
              <span className="cinema-kicker">Защо Хидромотор</span>
              <h2>Една система за техника, части и сервиз.</h2>
            </div>
            <div className="page-values__grid">
              {SELLING_POINTS.map((point, index) => {
                const Icon = pointIcons[index];
                return (
                  <article className="page-value-card cinema-reveal" key={point.title}>
                    <span className="page-value-card__number">0{index + 1}</span>
                    <div className="page-value-card__icon" aria-hidden="true">
                      <Icon size={28} />
                    </div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-cinema-cta cinema-reveal">
          <div className="container page-cinema-cta__inner">
            <div>
              <span className="cinema-kicker">Следващият проект</span>
              <h2>Нуждаете се от консултация?</h2>
              <p>Свържете се с нас за оферта или сервизен въпрос.</p>
            </div>
            <div className="page-cinema-cta__actions">
              <Link to="/kontakti" className="btn btn-primary">Свържете се с нас</Link>
              <Link to="/mashini" className="btn btn-outline">Разгледайте машините</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
