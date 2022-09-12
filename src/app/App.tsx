import { StrictMode } from 'react';
import Notebook from '../features/Notebook/Notebook';
import Entry from '../features/Entry';
import './App.css';

const App = () => {

    return (
        <div>
            <StrictMode>
                <Notebook>
                </Notebook>
            </StrictMode>
        </div>
    );
}

export default App;