import { useEffect } from 'react';
import { CHURCH } from '../config/appConfig';
import About from './landing/About';
import Footer from './landing/Footer';
import Hero from './landing/Hero';
import Navbar from './landing/Navbar';
import PlanVisit from './landing/PlanVisit';
import ServiceTimes from './landing/ServiceTimes';

export default function Landing() {
  useEffect(() => {
    document.title = `${CHURCH.name} · ${CHURCH.portalName}`;
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServiceTimes />
        <PlanVisit />
      </main>
      <Footer />
    </>
  );
}
