import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Machines from '../components/Machines';
import Services from '../components/Services';
import WhyHydromotor from '../components/WhyHydromotor';
import ServiceProcess from '../components/ServiceProcess';
import ContactMap from '../components/ContactMap';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Хидромотор — Официален представител на Putzmeister в България | Бетонпомпи и сервиз</title>
        <meta name="description" content="Хидромотор — официален представител на Putzmeister в България от 1998 г. Продажба на бетонпомпи, тунелни машини, резервни части и 24/7 сервиз. 25+ години опит." />
      </Helmet>
      <Hero />
      <Machines />
      <Services />
      <WhyHydromotor />
      <ServiceProcess />
      <ContactMap />
    </>
  );
}
