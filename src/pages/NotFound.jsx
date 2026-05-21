import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <section className="not-found">
      <Helmet>
        <title>Страницата не е намерена — Хидромотор</title>
        <meta name="description" content="Страницата, която търсите, не съществува или е преместена." />
      </Helmet>
      <div className="container not-found-content">
        <h1>404</h1>
        <h2>Страницата не е намерена</h2>
        <p>Страницата, която търсите, не съществува или е преместена.</p>
        <Link to="/" className="btn btn-primary">
          ← Към началната страница
        </Link>
      </div>
    </section>
  );
}
