import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconPhone, IconFileText } from './Icons';

function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`mobile-cta-bar ${visible ? 'visible' : ''}`}>
      <a href="tel:0878553273" className="cta-bar-phone">
        <IconPhone size={18} /> 0878 553 273
      </a>
      <Link to="/kontakti" className="cta-bar-quote">
        <IconFileText size={18} /> Запитване
      </Link>
    </div>
  );
}

export default MobileCtaBar;
