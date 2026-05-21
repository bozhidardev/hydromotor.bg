import React, { useState, useEffect } from 'react';
import { IconPhone } from './Icons';

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
    <a
      href="tel:0878553273"
      className={`mobile-cta-bar ${visible ? 'visible' : ''}`}
    >
      <IconPhone size={16} />
      <span>0878 553 273</span>
      <span className="cta-label">24/7 СЕРВИЗ</span>
    </a>
  );
}

export default MobileCtaBar;
