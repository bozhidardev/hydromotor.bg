import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import MobileCtaBar from './MobileCtaBar';
import BackToTop from './BackToTop';
import Footer from './Footer';

function useScrollReveal() {
  const location = useLocation();
  const observerRef = useRef(null);

  useEffect(() => {
    const revealAll = (elements) => {
      elements.forEach((el) => el.classList.add('revealed'));
    };

    const elements = Array.from(document.querySelectorAll('.scroll-reveal'));
    if (elements.length === 0) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      revealAll(elements);
      return undefined;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observerRef.current.observe(el));

    // Fallback: never leave content hidden if observer misses a frame.
    const failSafe = window.setTimeout(() => {
      elements.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
    }, 1200);

    return () => {
      window.clearTimeout(failSafe);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [location.pathname]);
}

function Layout() {
  useScrollReveal();

  return (
    <>
      <Header />
      <MobileCtaBar />
      <main>
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}

export default Layout;
