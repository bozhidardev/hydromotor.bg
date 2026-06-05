import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_SITE_NAME = 'Хидромотор';
const DEFAULT_BASE_URL = 'https://hydromotor.bg';
const DEFAULT_OG_IMAGE = `${DEFAULT_BASE_URL}/images/og-image.jpg`;

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_SITE_NAME;
  const canonicalUrl = canonical ? `${DEFAULT_BASE_URL}${canonical}` : DEFAULT_BASE_URL;

  const scripts = [];
  if (jsonLd) {
    const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    schemas.forEach((schema, idx) => {
      scripts.push(
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      );
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="bg_BG" />
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {scripts}
    </Helmet>
  );
}
