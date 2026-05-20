import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IconPhone } from './Icons';
import { asset } from '../data/assets';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
      <header className="header">
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
            <span className="header-phone-label"><IconPhone size={12} /> 24/7 СЕРВИЗ</span>
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
        <a href="tel:0878553273" className="header-phone-mobile" onClick={closeMenu}>
          <span className="header-phone-label"><IconPhone size={12} /> 24/7 СЕРВИЗ</span>
          <span className="header-phone-number">0878 553 273</span>
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
