import { useState, useRef } from 'react';
import { EventEmitter, Events } from '../events/events';
import { bundle } from '../bundler';
import { ArrowDown, ArrowUp, Iconoir, MoveUp, PlayOutline, Trash } from 'iconoir-react';
import Editor from "./Editor";
import Preview from "./Preview";
import './Entry.css';

interface EntryProp {
    id: number
}

const Entry: React.FC<EntryProp> = ({ id }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(input: string) {
        const output = await bundle(input);
        setCode(output.code + '//' + Date.now());
        setError(output.err);
        EventEmitter.dispatch(Events.RUN, { id, input });
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
                    <Preview code={code} error={error} id={id} />
                </div>
            </div>
            <div className="button-container">
                <div className="entry-button" onClick={handleRun}><PlayOutline color="gray" fontSize={12} /></div>
                <div className="entry-button" onClick={handleUp}><ArrowUp color="gray" fontSize={12} /></div>
                <div className="entry-button" onClick={handleDown}><ArrowDown color="gray" fontSize={12} /></div>
                <div className="entry-button" onClick={handleRemove}><Trash color="gray" fontSize={12} /></div>
            </div>
        </div>
    );
}

export default Entry;