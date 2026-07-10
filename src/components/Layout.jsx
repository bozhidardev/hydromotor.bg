import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileCtaBar from './MobileCtaBar';
import BackToTop from './BackToTop';
import ScrollToTop from './ScrollToTop';

function useCinematicMotion() {
  const location = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = Array.from(
      document.querySelectorAll('.cinema-reveal, .cinema-image-reveal, .scroll-reveal')
    );

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible', 'revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible', 'revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealElements.forEach((element, index) => {
      element.style.setProperty('--reveal-order', index % 6);
      observer.observe(element);
    });

    const failSafe = window.setTimeout(() => {
      revealElements.forEach((element) => element.classList.add('is-visible', 'revealed'));
    }, 1800);

    return () => {
      window.clearTimeout(failSafe);
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(max-width: 767px)').matches) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const viewport = window.innerHeight || 1;
      document.querySelectorAll('[data-parallax]').forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        const amount = Number(element.dataset.parallax || 24);
        element.style.setProperty('--parallax-y', `${progress * amount}px`);
      });
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);
}

export default function Layout() {
  useCinematicMotion();

  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <MobileCtaBar />
      <div className="site-main">
        <Outlet />
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}
