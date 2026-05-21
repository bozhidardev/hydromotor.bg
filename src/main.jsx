import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/hydromotor.bg">
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
