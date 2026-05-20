import React from 'react';
import { COMPANY, SELLING_POINTS } from '../data/content';

function WhyHydromotor() {
  return (
    <section className="why-hydromotor scroll-reveal" id="why-us">
      <div className="container">
        <div className="section-header">
          <h2>Защо Хидромотор</h2>
          <p>{COMPANY.slogan}</p>
        </div>
        <div className="why-hydromotor-grid">
          <div className="why-hydromotor-text">
            <p>{COMPANY.description}</p>
            <p>{COMPANY.serviceDescription}</p>
          </div>
          <div className="why-hydromotor-points">
            {SELLING_POINTS.map((point, index) => (
              <div className="why-point" key={index}>
                <div className="why-point-text">
                  <h4>{point.title}</h4>
                  <p>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyHydromotor;
