import { COMPANY, CONTACT } from '../data/content';

const BASE_URL = 'https://hydromotor.bg';

/**
 * Organization schema — used on home, about, etc.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.fullName,
    alternateName: COMPANY.shortName,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo_Hydromotor.png`,
    description: COMPANY.description,
    foundingDate: String(COMPANY.founded),
    sameAs: [CONTACT.facebook],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phones[0]?.replace(/\s/g, ''),
      contactType: 'sales',
      availableLanguage: ['Bulgarian', 'English', 'German'],
    },
  };
}

/**
 * LocalBusiness schema — used on contact page.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.fullName,
    image: `${BASE_URL}/images/logo_Hydromotor.png`,
    url: BASE_URL,
    telephone: CONTACT.phones.map((p) => p.replace(/\s/g, '')),
    email: CONTACT.emails,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'с. Кривина, ул. "Искър" 53А',
      addressLocality: 'София',
      postalCode: '1588',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.gpsLat,
      longitude: CONTACT.gpsLng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  };
}

/**
 * Product schema — auto-generated from machine data.
 * @param {object} machine - machine entry from MACHINES array
 */
export function productSchema(machine) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${machine.brand} ${machine.name}`,
    brand: {
      '@type': 'Brand',
      name: machine.brand,
    },
    image: `${BASE_URL}${machine.image}`,
    description: machine.description,
    url: `${BASE_URL}/mashini/${machine.slug}`,
    category: machine.category,
    manufacturer: {
      '@type': 'Organization',
      name: machine.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/mashini/${machine.slug}`,
      priceCurrency: 'BGN',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    additionalProperty: machine.specs
      ? Object.entries(machine.specs).map(([key, value]) => ({
          '@type': 'PropertyValue',
          name: key,
          value,
        }))
      : undefined,
  };
}

/**
 * BreadcrumbList schema — generic helper.
 * @param {Array<{name:string, url:string}>} items
 */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * WebPage schema — generic helper for any page.
 */
export function webPageSchema(title, description, urlPath = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: urlPath ? `${BASE_URL}${urlPath}` : BASE_URL,
    inLanguage: 'bg',
  };
}

/**
 * Service schema — used on the services page.
 */
export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Сервиз Хидромотор',
    provider: {
      '@type': 'Organization',
      name: COMPANY.fullName,
      url: BASE_URL,
    },
    description:
      'Професионален сервиз за диагностика и ремонт на бетонпомпи, тунелни машини и промишлени помпи. 24/7 аварийна помощ в цяла България.',
    areaServed: {
      '@type': 'Country',
      name: 'Bulgaria',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: '+359878553273',
        contactType: 'emergency service',
        availableLanguage: ['Bulgarian'],
      },
    },
  };
}

/**
 * CollectionPage schema — used on downloads/catalogues page.
 */
export function collectionPageSchema(title, description, urlPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${BASE_URL}${urlPath}`,
    inLanguage: 'bg',
  };
}
