import React from 'react';
import { IconFactory, IconHandshake, IconPackage, IconWrench, IconMapPin, IconPhone } from './Icons';

const trustItems = [
  { icon: IconFactory, label: 'Основана през 1996 г.' },
  { icon: IconHandshake, label: 'Представител на Putzmeister от 1998 г.' },
  { icon: IconPackage, label: 'Резервни части на склад' },
  { icon: IconWrench, label: 'Ремонт в хале и на място' },
  { icon: IconMapPin, label: 'Сервиз в цяла България' },
  { icon: IconPhone, label: '24/7 аварийна помощ' },
];

function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-bar-track">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className="trust-item" key={index}>
              <span className="trust-item-icon"><Icon size={18} /></span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrustBar;
