import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../data/content';
import { IconFacebook, IconLinkedin, IconPhone } from './Icons';
import { asset } from '../data/assets';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__wordmark" aria-hidden="true">HYDROMOTOR</div>
      <div className="container site-footer__top">
        <div className="footer-brand-block">
          <img src={asset('images/logo_Hydromotor.png')} alt="Хидромотор" />
          <div>
            <span>ИНЖЕНЕРНА НАДЕЖДНОСТ</span>
            <h2>Машини. Части.<br />Сервиз.</h2>
          </div>
        </div>
        <a href="tel:0878553273" className="footer-emergency">
          <span><IconPhone size={18} /> 24/7 СЕРВИЗНА ЛИНИЯ</span>
          <strong>0878 553 273</strong>
        </a>
      </div>

      <div className="container site-footer__grid">
        <div>
          <span className="footer-label">НАВИГАЦИЯ</span>
          <div className="footer-links">
            <Link to="/mashini">Машини</Link><Link to="/serviz">Сервиз</Link>
            <Link to="/za-nas">За нас</Link><Link to="/katalozi">Каталози</Link>
            <Link to="/kontakti">Контакти</Link>
          </div>
        </div>
        <div>
          <span className="footer-label">АДРЕС</span>
          <p>{CONTACT.address}</p>
          <p className="footer-coordinates">N {CONTACT.gpsLat} / E {CONTACT.gpsLng}</p>
        </div>
        <div>
          <span className="footer-label">КОНТАКТ</span>
          <a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>{CONTACT.phones[0]}</a>
          <a href={`mailto:${CONTACT.emails[1]}`}>{CONTACT.emails[1]}</a>
        </div>
        <div>
          <span className="footer-label">СОЦИАЛНИ МРЕЖИ</span>
          <div className="footer-socials">
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconFacebook size={20} /></a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} ХИДРОМОТОР ООД</span>
        <span>ОФИЦИАЛЕН ПРЕДСТАВИТЕЛ НА PUTZMEISTER ОТ 1998</span>
      </div>
    </footer>
  );
}
