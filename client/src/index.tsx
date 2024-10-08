import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './FrontRoutes';

const container = document.getElementById('root'); //the div that containes the web, 

if (container) {
  const root = ReactDOM.createRoot(container);
  
  root.render(
    <React.StrictMode>
          <App />
    </React.StrictMode>
  );
} else {
  console.error('Root container not found');
}

