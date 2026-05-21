import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../data/content';
import { IconMapPin, IconPhone, IconAlertTriangle, IconMail, IconFacebook, IconLinkedin } from './Icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Хидромотор</h4>
          <p>
            Официален представител на Putzmeister в България от 1998 г.
            Продажба, сервиз и резервни части за бетонпомпи, тунелни машини и
            индустриални помпи.
          </p>
        </div>

        <div className="footer-col">
          <h4>Бързи връзки</h4>
          <div className="footer-links">
            <Link to="/mashini">› Машини</Link>
            <Link to="/serviz">› Услуги</Link>
            <Link to="/za-nas">› За нас</Link>
            <Link to="/kontakti">› Контакти</Link>
            <Link to="/katalozi">› Каталози</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Контакти</h4>
          <div className="footer-contact-item">
            <span className="footer-contact-icon"><IconMapPin size={16} /></span>
            <span>{CONTACT.address}</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon"><IconPhone size={16} /></span>
            <span>
              <a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>
                {CONTACT.phones[0]}
              </a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon"><IconAlertTriangle size={16} /></span>
            <span>
              <a href={`tel:${CONTACT.servicePhones[0].replace(/\s/g, '')}`}>
                24/7: {CONTACT.servicePhones[0]}
              </a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-icon"><IconMail size={16} /></span>
            <span>
              <a href={`mailto:${CONTACT.emails[1]}`}>{CONTACT.emails[1]}</a>
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Последвайте ни</h4>
          <p>Следете ни за нови машини, актуални оферти и сервизни новини.</p>
          <div className="footer-social">
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <IconFacebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/hydromotor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedin size={20} />
            </a>
          </div>
          <div className="footer-legal">
            <a href="#" onClick={(e) => e.preventDefault()}>Политика за бисквитки</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {currentYear} Хидромотор ООД. Всички права запазени.</p>
      </div>
    </footer>
  );
}

export default Footer;
