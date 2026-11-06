import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client';
import App from '../src/App';

export function hydrate(container, onRecoverableError) {
  return hydrateRoot(container, <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>, { onRecoverableError });
}
