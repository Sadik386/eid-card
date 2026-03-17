import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';

// Unregister any old service workers that cause refresh loops
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
