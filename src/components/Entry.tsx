import { useState, useRef } from 'react';
import Editor from "./Editor";
import Preview from "./Preview";
import { EventEmitter, Events } from '../events/events';
import './Entry.css';

interface EntryProp {
    id: number
}

const Entry: React.FC<EntryProp> = ({ id }) => {
    const [code, setCode] = useState('');

    function onSubmit(input: string) {
        console.log('submitted from', id);
        setCode(input);
        EventEmitter.dispatch(Events.RUN, id);
    }

    function handleRun() {
        EventEmitter.dispatch(Events.RUN, id);
    }

    function handleUp() {
        EventEmitter.dispatch(Events.MOVE_UP, id);
    }

    function handleDown() {
        EventEmitter.dispatch(Events.MOVE_DOWN, id);
    }

    function handleRemove() {
        EventEmitter.dispatch(Events.REMOVE, id);
    }

    return (
        <div className='entry-container'>
            <div className="entry-block">
                <div className="entry-id">[{id}]:</div>
                <div className='editor-preview'>
                    <Editor onSubmit={onSubmit} id={id} />
                    <Preview input={code} />
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleRun}>Run</button>
                <button onClick={handleUp}>Up</button>
                <button onClick={handleDown}>Down</button>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
}

export default Entry;