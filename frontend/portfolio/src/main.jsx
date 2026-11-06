import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const application = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root');
if (root.hasChildNodes() && !root.innerHTML.includes('<!--app-html-->')) hydrateRoot(root, application);
else createRoot(root).render(application);
