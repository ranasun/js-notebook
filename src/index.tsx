import { createRoot } from 'react-dom/client';
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from './app/App';

const root = createRoot(document.getElementById('root') as Element);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);