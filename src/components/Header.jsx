import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconPhone } from './Icons';
import { asset } from '../data/assets';

const navigation = [
  { to: '/', label: 'Начало', end: true },
  { to: '/mashini', label: 'Машини' },
  { to: '/serviz', label: 'Сервиз' },
  { to: '/za-nas', label: 'За нас' },
  { to: '/katalozi', label: 'Каталози' },
  { to: '/kontakti', label: 'Контакти' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.classList.add('menu-locked');
    const focusable = Array.from(menuRef.current?.querySelectorAll('a, button') || []);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const focusTimer = window.setTimeout(() => first?.focus(), 80);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key !== 'Tab' || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-locked');
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <NavLink to="/" className="site-brand" onClick={closeMenu} end>
            <img src={asset('images/logo_Hydromotor.png')} alt="Хидромотор" />
            <span><strong>ХИДРОМОТОР</strong><small>ENGINEERING SINCE 1996</small></span>
          </NavLink>

          <nav className="desktop-nav" aria-label="Основна навигация">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a href="tel:0878553273" className="header-service">
            <IconPhone size={15} />
            <span><small>24/7 СЕРВИЗ</small><strong>0878 553 273</strong></span>
          </a>

          <button
            ref={toggleRef}
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Затвори менюто' : 'Отвори менюто'}
            aria-expanded={menuOpen}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Навигационно меню"
      >
        <div className="mobile-nav__grid" aria-hidden="true" />
        <nav aria-label="Мобилна навигация">
          {navigation.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              end={item.end}
              onClick={closeMenu}
              style={{ '--menu-index': index }}
            >
              <span>0{index + 1}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-nav__contact">
          <span>АВАРИЙНА ЛИНИЯ</span>
          <a href="tel:0878553273" onClick={closeMenu}>0878 553 273</a>
        </div>
      </div>
    </>
  );
}
