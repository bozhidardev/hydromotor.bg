import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import { MACHINES } from '../data/machines';
import { COMPANY, SERVICE_TEXT } from '../data/content';
import { organizationSchema, webPageSchema } from '../utils/seoSchema';
import { asset } from '../data/assets';
import {
  IconArrowUp,
  IconGraduationCap,
  IconPackage,
  IconPhone,
  IconTruck,
  IconWrench,
} from '../components/Icons';

const services = [
  { number: '01', icon: IconWrench, title: 'Диагностика и ремонт', text: SERVICE_TEXT.intro },
  { number: '02', icon: IconGraduationCap, title: 'Подготвени инженери', text: SERVICE_TEXT.training },
  { number: '03', icon: IconTruck, title: 'Мобилен сервиз', text: SERVICE_TEXT.mobileService },
  { number: '04', icon: IconPackage, title: 'Резервни части', text: SERVICE_TEXT.spareParts },
];

const process = [
  ['01', 'Сигнал', 'Свържете се с 24/7 сервизната линия.'],
  ['02', 'Диагностика', 'Установяваме проблема в сервиза или на място.'],
  ['03', 'Ремонт', 'Работим с подходящи части и оборудване.'],
  ['04', 'Готовност', 'Машината се връща към работа възможно най-бързо.'],
];

function topSpec(machine) {
  const priority = ['Вертикален обхват', 'Капацитет', 'Брой рамене'];
  const key = priority.find((item) => machine.specs?.[item]) || Object.keys(machine.specs || {})[0];
  return key ? { key, value: machine.specs[key] } : null;
}

export default function Home() {
  const featured = [MACHINES[1], MACHINES[0], MACHINES[5], MACHINES[3]].filter(Boolean);

  return (
    <>
      <SEO
        title="Официален представител на Putzmeister в България"
        description="Хидромотор — продажба и сервиз на бетонпомпи, тунелни машини и индустриални помпи. 24/7 поддръжка."
        canonical="/"
        jsonLd={[
          organizationSchema(),
          webPageSchema(
            'Официален представител на Putzmeister в България',
            'Хидромотор — продажба и сервиз на бетонпомпи, тунелни машини и индустриални помпи.',
            '/'
          ),
        ]}
      />
      <main className="home-cinema">
      <Hero />

      <section className="home-intro cinema-section">
        <div className="container home-intro__grid">
          <div className="cinema-reveal">
            <span className="cinema-kicker">ХИДРОМОТОР ООД / СОФИЯ</span>
            <h2 className="display-title">Инженерна опора за <em>тежката техника.</em></h2>
          </div>
          <div className="home-intro__copy cinema-reveal">
            <p>{COMPANY.description}</p>
            <Link to="/za-nas" className="text-link">Нашата история <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="machine-showcase cinema-section" id="machines">
        <div className="container section-heading section-heading--split cinema-reveal">
          <div>
            <span className="cinema-kicker cinema-kicker--light">КАТАЛОГ / 07 МАШИНИ</span>
            <h2>Създадени за мащаб.</h2>
          </div>
          <Link to="/mashini" className="btn btn-ghost-light">Всички машини <span>↗</span></Link>
        </div>

        <div className="machine-showcase__track">
          {featured.map((machine, index) => {
            const spec = topSpec(machine);
            return (
              <Link
                to={`/mashini/${machine.slug}`}
                className="showcase-machine cinema-reveal"
                style={{ '--card-index': index }}
                key={machine.slug}
              >
                <div className="showcase-machine__image cinema-image-reveal">
                  <img src={asset(machine.image)} alt={`${machine.brand} ${machine.name}`} loading="lazy" />
                  <span className="showcase-machine__number">0{index + 1}</span>
                </div>
                <div className="showcase-machine__body">
                  <span>{machine.brand} / {machine.category}</span>
                  <h3>{machine.name}</h3>
                  {spec && <dl><dt>{spec.key}</dt><dd>{spec.value}</dd></dl>}
                  <span className="showcase-machine__arrow"><IconArrowUp size={19} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="service-manifesto cinema-section">
        <div className="service-manifesto__media cinema-image-reveal" data-parallax="22">
          <img src={asset('images/cinematic/service-industrial.webp')} alt="" loading="lazy" />
        </div>
        <div className="service-manifesto__shade" />
        <div className="container service-manifesto__content">
          <div className="service-manifesto__heading cinema-reveal">
            <span className="cinema-kicker cinema-kicker--light">СЕРВИЗНА ЕКСПЕРТИЗА</span>
            <h2>Когато престоят <em>не е опция.</em></h2>
            <p>Сервиз в оборудвано хале и на място при клиента в цяла България.</p>
            <a href="tel:0878553273" className="service-line"><IconPhone size={20} /><span><small>24/7 ЛИНИЯ</small>0878 553 273</span></a>
          </div>
          <div className="service-matrix">
            {services.map(({ number, icon: Icon, title, text }) => (
              <article className="service-matrix__item cinema-reveal" key={number}>
                <div><span>{number}</span><Icon size={25} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section cinema-section">
        <div className="container">
          <div className="section-heading cinema-reveal">
            <span className="cinema-kicker">ОТ СИГНАЛ ДО ГОТОВНОСТ</span>
            <h2>Ясен сервизен процес.</h2>
          </div>
          <div className="process-line">
            {process.map(([number, title, text]) => (
              <article className="process-line__step cinema-reveal" key={number}>
                <span className="process-line__number">{number}</span>
                <div className="process-line__marker" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-contact">
        <div className="home-contact__media" data-parallax="24" aria-hidden="true">
          <img src={asset('images/cinematic/contact-industrial.webp')} alt="" loading="lazy" />
        </div>
        <div className="home-contact__shade" />
        <div className="container home-contact__content cinema-reveal">
          <span className="cinema-kicker cinema-kicker--light">СЛЕДВАЩИЯТ ВИ ПРОЕКТ</span>
          <h2>Нека задвижим<br /><em>работата.</em></h2>
          <p>За оферта, техническа консултация или сервизен въпрос.</p>
          <div>
            <Link to="/kontakti" className="btn btn-primary">Свържете се с нас <span>↗</span></Link>
            <a href="mailto:office@hydromotor.bg" className="btn btn-ghost-light">office@hydromotor.bg</a>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
