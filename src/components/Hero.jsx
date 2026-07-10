import React from 'react';
import { Link } from 'react-router-dom';
import { IconPhone, IconChevronDown } from './Icons';
import { asset } from '../data/assets';

const authority = [
  { value: '1996', label: 'основана компанията' },
  { value: '1998', label: 'представител на Putzmeister' },
  { value: '24/7', label: 'сервизна подкрепа' },
];

export default function Hero() {
  return (
    <section className="cinema-hero" id="hero">
      <div className="cinema-hero__media" data-parallax="36" aria-hidden="true">
        <img src={asset('images/cinematic/hero-industrial.webp')} alt="" fetchPriority="high" />
      </div>
      <div className="cinema-hero__shade" aria-hidden="true" />
      <div className="cinema-hero__grid" aria-hidden="true" />
      <div className="cinema-hero__beam" aria-hidden="true" />

      <div className="container cinema-hero__content">
        <div className="cinema-hero__eyebrow hero-enter hero-enter--1">
          <span className="status-dot" /> Официален представител на Putzmeister
        </div>
        <h1 className="hero-enter hero-enter--2">
          <span>Сила за</span>
          <em>строителството.</em>
        </h1>
        <p className="cinema-hero__copy hero-enter hero-enter--3">
          Бетонпомпи, индустриални решения и сервизна експертиза за проекти без компромис.
        </p>
        <div className="cinema-hero__actions hero-enter hero-enter--4">
          <Link to="/mashini" className="btn btn-primary btn-arrow">
            Разгледайте машините <span aria-hidden="true">↗</span>
          </Link>
          <a href="tel:0878553273" className="btn btn-ghost-light">
            <IconPhone size={17} /> 24/7 сервиз
          </a>
        </div>
      </div>

      <div className="cinema-hero__rail" aria-label="Ключови факти">
        {authority.map((item, index) => (
          <div className="hero-rail-item hero-enter" style={{ '--hero-delay': `${680 + index * 110}ms` }} key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <a href="#machines" className="cinema-hero__scroll" aria-label="Към съдържанието">
        <span>SCROLL</span>
        <IconChevronDown size={16} />
      </a>
      <span className="cinema-hero__coordinate" aria-hidden="true">42.67459° N · 23.46723° E</span>
    </section>
  );
}
