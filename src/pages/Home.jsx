import React from 'react';
import SEO from '../components/SEO';
import { organizationSchema, webPageSchema } from '../utils/seoSchema';
import Hero from '../components/Hero';
import Machines from '../components/Machines';
import Services from '../components/Services';
import WhyHydromotor from '../components/WhyHydromotor';
import ServiceProcess from '../components/ServiceProcess';
import ContactMap from '../components/ContactMap';

export default function Home() {
  return (
    <>
      <SEO
        title="Официален представител на Putzmeister в България"
        description="Хидромотор — продажба и сервиз на бетонпомпи, тунелни машини и индустриални помпи. 25+ години опит. 24/7 поддръжка."
        canonical="/"
        jsonLd={[
          organizationSchema(),
          webPageSchema(
            'Официален представител на Putzmeister в България',
            'Хидромотор — продажба и сервиз на бетонпомпи, тунелни машини и индустриални помпи. 25+ години опит. 24/7 поддръжка.',
            '/'
          ),
        ]}
      />
      <Hero />
      <Machines />
      <Services />
      <WhyHydromotor />
      <ServiceProcess />
      <ContactMap />
    </>
  );
}
