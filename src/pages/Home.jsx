import React from 'react';
import Hero from '../components/Hero';
import Machines from '../components/Machines';
import Services from '../components/Services';
import WhyHydromotor from '../components/WhyHydromotor';
import ServiceProcess from '../components/ServiceProcess';
import ContactMap from '../components/ContactMap';

export default function Home() {
  return (
    <>
      <Hero />
      <Machines />
      <Services />
      <WhyHydromotor />
      <ServiceProcess />
      <ContactMap />
    </>
  );
}
