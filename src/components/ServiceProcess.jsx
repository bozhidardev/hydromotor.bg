import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Сигнализирате',
    description: 'Свържете се с нас по телефон, имейл или през формата за контакт.',
  },
  {
    number: 2,
    title: 'Диагностика',
    description: 'Нашите техници извършват пълна диагностика на проблема.',
  },
  {
    number: 3,
    title: 'Ремонт',
    description: 'Извършваме ремонта с оригинални части и професионално оборудване.',
  },
  {
    number: 4,
    title: 'Готово',
    description: 'Техниката ви е върната в работна готовност с гаранция за качество.',
  },
];

function ServiceProcess() {
  return (
    <section className="service-process scroll-reveal section-diagonal dark-grid-overlay" id="process">
      <div className="container">
        <div className="section-header">
          <h2>Как работи сервизният процес</h2>
          <p>От сигнал до готовност — бързо и професионално</p>
        </div>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="process-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceProcess;
