import { StrictMode, useEffect } from 'react';
import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'
import { add } from '../features/Notebook/slice'
import Notebook from '../features/Notebook';
import Entry from '../features/Entry';
import './App.css';

const App = () => {
    const entries = useSelector((state: RootState) => state.notebook.entries);
    const order = useSelector((state: RootState) => state.notebook.order);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(add(0));
    }, [])

    return (
        <div>
            <StrictMode>
                <Notebook>
                    {order.map((entryId) => {
                        const props = entries[entryId];
                        return <Entry key={entryId} {...props} />
                    })}
                </Notebook>
            </StrictMode>
        </div>
    );
}

export default App;