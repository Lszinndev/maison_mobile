import React from 'react';
import Home from './Home';
import About from './About';
import Cases from './Cases';
import Testimonials from './Testimonials';
import Location from './Location';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      <Home />
      <About />
      <Cases />
      <Testimonials />
      <Location />
      <Footer />
    </div>
  );
}

