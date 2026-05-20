import React from 'react';
import { SERVICE_TEXT } from '../data/content';
import { IconAlertTriangle, IconPhone } from './Icons';

function EmergencySticky() {
  return (
    <div className="emergency-sticky">
      <span className="emergency-sticky-icon"><IconAlertTriangle size={18} /></span>
      <span>24/7 Аварийна помощ:</span>
      <a href={`tel:${SERVICE_TEXT.phone247}`}>
        <IconPhone size={16} /> {SERVICE_TEXT.phone247}
      </a>
    </div>
  );
}

export default EmergencySticky;
