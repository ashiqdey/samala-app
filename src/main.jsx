
// main scss file
import './assets/scss/main.scss';

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

// redux
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store';


import { SettingsProvider } from './contexts/SettingsContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';

// -----------------------------------------------


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SettingsProvider>
          <BrowserRouter basename={import.meta.env.VITE_FOLDER || '/'}>
            {/* <BrowserRouter> */}
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
