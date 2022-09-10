import { StrictMode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Notebook from './Notebook';
import Entry from './Entry';
import { EventEmitter, Events } from '../events/events';
import './App.css';

const App = () => {
    const [currentId, setCurrentId] = useState<number>(1);
    const [entries, setEntries] = useState<any[]>([<Entry key={Date.now()} id={currentId} />]);

    EventEmitter.unsubscribe(Events.RUN);

    EventEmitter.subscribe(Events.RUN, (id) => {
        const position = entries.findIndex(entry => entry.props.id === id);
        if (position < entries.length - 1) {
            setEntries(entries);
            console.log(entries[position + 1].props.id);
            EventEmitter.dispatch(Events.SET_FOCUS, entries[position + 1].props.id);
        } else {
            setEntries([...entries, <Entry key={Date.now()} id={currentId + 1} />]);
            setCurrentId(currentId + 1);
        }
    });

    EventEmitter.subscribe(Events.MOVE_UP, (entry_id) => {
        const position = entries.findIndex(entry => entry.props.id === entry_id);
        if (position === 0) return;
        const newEntries = [...entries];
        let temp = newEntries[position];
        newEntries[position] = newEntries[position - 1];
        newEntries[position - 1] = temp;
        setEntries(newEntries);
    });

    EventEmitter.subscribe(Events.MOVE_DOWN, (entry_id) => {
        const position = entries.findIndex(entry => entry.props.id === entry_id);
        if (position === entries.length - 1) return;
        const newEntries = [...entries];
        let temp = newEntries[position + 1];
        newEntries[position + 1] = newEntries[position];
        newEntries[position] = temp;
        setEntries(newEntries);
    });

    EventEmitter.subscribe(Events.REMOVE, (entry_id) => {
        const filteredEntries = entries.filter(entry => entry.props.id !== entry_id);
        setEntries(filteredEntries);
    });

    return (
        <div>
            <StrictMode>
                <Notebook>
                    {entries}
                </Notebook>
            </StrictMode>
        </div>
    );
}

export default App;