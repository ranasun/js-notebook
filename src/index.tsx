import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './app/App';

let persistor = persistStore(store);

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);

// expose store when run in Cypress
// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}
