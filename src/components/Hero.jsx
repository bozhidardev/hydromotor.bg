import React from 'react';
import { Link } from 'react-router-dom';
import { IconFileText, IconWrench, IconChevronDown, IconFactory, IconHandshake, IconPackage, IconPhone, IconMapPin, IconShield } from './Icons';
import { asset } from '../data/assets';

const trustItems = [
  { icon: IconFactory, title: '25+ ГОДИНИ ОПИТ', sub: 'Основана през 1996 г.' },
  { icon: IconHandshake, title: 'ОФИЦИАЛЕН ПАРТНЬОР', sub: 'Putzmeister от 1998 г.' },
  { icon: IconPackage, title: 'РЕЗЕРВНИ ЧАСТИ', sub: 'Налични на склад' },
  { icon: IconMapPin, title: '24/7 ПОДДРЪЖКА', sub: 'Сервиз в цяла България' },
  { icon: IconShield, title: 'КАЧЕСТВО И НАДЕЖДНОСТ', sub: 'Ремонт в хале и на място' },
];

function Hero() {
  return (
    <section className="hero" id="hero"
      style={{
        backgroundImage: `url(${asset('images/hero-slide-1.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            ОФИЦИАЛЕН ПРЕДСТАВИТЕЛ НА PUTZMEISTER ЗА БЪЛГАРИЯ
          </div>

          <h1>ХИДРОМОТОР</h1>

          <p className="hero-subtitle">
            Вашият партньор в <strong className="hero-highlight">строителството</strong>
          </p>

          <p className="hero-body">
            Бетонпомпи, тунелни машини, промишлени помпи, резервни части и професионален сервиз.
          </p>

          <div className="hero-actions">
            <Link to="/kontakti" className="btn btn-primary btn-cta">
              <IconFileText size={18} /> ПОИСКАЙ ОФЕРТА
            </Link>
            <a href="tel:0878553273" className="btn btn-outline-light btn-cta">
              <IconWrench size={18} /> 24/7 СЕРВИЗ
            </a>
          </div>
        </div>
      </div>

      {/* Trust bar below hero */}
      <div className="hero-trust-bar">
        {trustItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div className="hero-trust-item" key={i}>
              <div className="hero-trust-icon">
                <Icon size={22} />
              </div>
              <div className="hero-trust-text">
                <span className="hero-trust-title">{item.title}</span>
                <span className="hero-trust-sub">{item.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <IconChevronDown size={20} />
      </div>
    </section>
  );
}

export default Hero;
