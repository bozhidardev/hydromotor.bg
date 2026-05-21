import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IconPhone } from './Icons';
import { asset } from '../data/assets';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // iOS-friendly body scroll lock
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    } else {
      document.body.style.overflow = '';
      return undefined;
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <NavLink to="/" className="header-logo" onClick={closeMenu}>
            <img src={asset('images/logo_Hydromotor.png')} alt="Хидромотор" />
          </NavLink>

          <nav className="header-nav">
            <NavLink to="/" className={linkClass}>
              Начало
            </NavLink>
            <NavLink to="/mashini" className={linkClass}>
              Машини
            </NavLink>
            <NavLink to="/serviz" className={linkClass}>
              Услуги
            </NavLink>
            <NavLink to="/za-nas" className={linkClass}>
              За нас
            </NavLink>
            <NavLink to="/kontakti" className={linkClass}>
              Контакти
            </NavLink>
          </nav>

          <a href="tel:0878553273" className="header-phone-desktop">
            <span className="header-phone-label"><IconPhone size={12} /> Свържете се с нас</span>
            <span className="header-phone-number">0878 553 273</span>
          </a>

          <div className="header-hamburger-wrapper">
            <button
              className={`header-hamburger ${menuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
          <span>✕</span>
        </button>
        <NavLink to="/" className={linkClass} onClick={closeMenu}>
          Начало
        </NavLink>
        <NavLink to="/mashini" className={linkClass} onClick={closeMenu}>
          Машини
        </NavLink>
        <NavLink to="/serviz" className={linkClass} onClick={closeMenu}>
          Услуги
        </NavLink>
        <NavLink to="/za-nas" className={linkClass} onClick={closeMenu}>
          За нас
        </NavLink>
        <NavLink to="/kontakti" className={linkClass} onClick={closeMenu}>
          Контакти
        </NavLink>

        <a href="tel:0878553273" className="mobile-menu-phone" onClick={closeMenu}>
          <IconPhone size={14} />
          <span>0878 553 273</span>
          <span className="menu-phone-label">24/7 СЕРВИЗ</span>
        </a>

      </div>

      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      ></div>
    </>
  );
}

export default Header;
