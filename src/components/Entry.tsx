import { useState, useRef, useEffect } from 'react';
import { EventEmitter, Events } from '../events/events';
import { bundle } from '../bundler';
import MarkdownPreview from './MarkdownPreview';
import { ArrowDown, ArrowUp, CodeBracketsSquare, PlayOutline, TextAlt, Trash } from 'iconoir-react';
import Editor from "./Editor";
import Preview from "./Preview";
import './Entry.css';

interface EntryProp {
    id: number
}

const Entry: React.FC<EntryProp> = ({ id }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [markdown, setMarkdown] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [input, setInput] = useState('');
    const [hasFocus, setHasFocus] = useState(false);

    async function onSubmit(input: string) {
        if (markdown) {
            // setCode(input);
            setInput(input);
            setIsHidden(true);
            EventEmitter.dispatch(Events.RUN, { id, input });
        } else {
            setIsHidden(false);
            const output = await bundle(input);
            setCode(output.code + '//' + Date.now());
            setError(output.err);
            EventEmitter.dispatch(Events.RUN, { id, input });
        }
    }

    function toggleMarkdown() {
        setMarkdown(!markdown);
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

    function handleDoubleClick() {
        setIsHidden(false);
    }

    function handleFocus() {
        setHasFocus(true);
    }

    function handleBlur() {
        setHasFocus(false);
    }

    const className = `entry-container ${hasFocus ? 'focus' : ''}`;

    return (
        <div className={className} tabIndex={id} onFocus={handleFocus} onBlur={handleBlur}>
            <div className="entry-block">
                <div className="entry-id" style={{ opacity: markdown ? 0 : 1 }}>[{id}]:</div>
                <div className='editor-preview' onDoubleClick={handleDoubleClick}>
                    {isHidden && <MarkdownPreview>{input}</MarkdownPreview>}
                    {!isHidden && <Editor value={input} onSubmit={onSubmit} id={id} isMarkdown={markdown} />}
                    {!isHidden && <Preview code={markdown ? '' : code} error={error} id={id} />}
                </div>
            </div>
            <div className="button-container" >
                {
                    !isHidden &&
                    <div className="entry-button" onClick={toggleMarkdown}>
                        {markdown ?
                            <TextAlt color="gray" fontSize={12} /> : <CodeBracketsSquare color="gray" fontSize={12} />
                        }
                    </div>
                }
                {/* <div className="entry-button" onClick={handleRun}><PlayOutline color="gray" fontSize={12} /></div> */}
                <div className="entry-button" onClick={handleUp}><ArrowUp color="gray" fontSize={12} /></div>
                <div className="entry-button" onClick={handleDown}><ArrowDown color="gray" fontSize={12} /></div>
                <div className="entry-button" onClick={handleRemove}><Trash color="gray" fontSize={12} /></div>
            </div>
        </div>
    );
}

export default Entry;