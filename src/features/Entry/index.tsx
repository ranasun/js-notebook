import { useState, useRef, useEffect } from 'react';
import { EventEmitter, Events } from '../../common/events';
import { bundle } from '../../common/bundler';
import MarkdownPreview from './EntryPreview/MarkdownPreview';
import { ArrowDown, ArrowUp, CodeBracketsSquare, PlayOutline, TextAlt, Trash } from 'iconoir-react';
import EntryEditor from "./EntryEditor";
import EntryPreview from "./EntryPreview";
import EntryButton from './EntryButton';
import './style.css';

interface EntryProp {
    entryId: number,
    content: string,
    type: string
}

const Entry: React.FC<EntryProp> = ({ entryId, content, type }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    // const [type, setType] = useState('code');
    const [data, setData] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    const [input, setInput] = useState('');
    const [hasFocus, setHasFocus] = useState(false);

    async function onSubmit(input: string) {
        if (type === 'text') {
            setInput(input);
            setIsHidden(true);
            EventEmitter.dispatch(Events.RUN, { entryId, input });
        } else {
            setIsHidden(false);
            const output = await bundle(input);
            setData(output.code);
            // setCode(output.code + '//' + Date.now());
            // setError(output.err);
            EventEmitter.dispatch(Events.RUN, { entryId, input });
        }
    }

    function toggleEditorType() {
        // setType(type === 'code' ? 'text' : 'code');
    }

    function handleRun() {
        EventEmitter.dispatch(Events.RUN, entryId);
    }

    function moveEntryUp() {
        EventEmitter.dispatch(Events.MOVE_UP, entryId);
    }

    function moveEntryDown() {
        EventEmitter.dispatch(Events.MOVE_DOWN, entryId);
    }

    function removeEntry() {
        EventEmitter.dispatch(Events.REMOVE, entryId);
    }

    function handleDoubleClick() {
        setIsHidden(false);
    }

    function onFocus() {
        setHasFocus(true);
    }

    function onBlur() {
        setHasFocus(false);
    }

    const className = `entry-container ${hasFocus ? 'focus' : ''}`;

    const iconProps = {
        color: "gray",
        fontSize: 12
    }

    return (
        <div className={className} tabIndex={entryId} onFocus={onFocus} onBlur={onBlur} onDoubleClick={handleDoubleClick}>
            <div className="entry-block">
                <div className="entry-id" style={{ opacity: type === 'code' ? 0 : 1 }}>[{entryId}]:</div>
                <div className='editor-preview' >
                    {/* {isHidden && <MarkdownPreview>{input}</MarkdownPreview>}
                    {!isHidden && <EntryEditor value={input} onSubmit={onSubmit}entryId={entryId} isMarkdown={markdown} />}
                    {!isHidden && <EntryPreview code={markdown ? '' : code} error={error}entryId={entryId} />} */}
                    <EntryPreview entryId={entryId} data={data} type={type} />
                </div>
            </div>
            <div className="button-container">
                <EntryButton onClick={toggleEditorType}>
                    {type === 'code' ?
                        <CodeBracketsSquare {...iconProps} /> :
                        <TextAlt {...iconProps} />
                    }
                </EntryButton>
                <EntryButton onClick={moveEntryUp}><ArrowUp {...iconProps} /></EntryButton>
                <EntryButton onClick={moveEntryDown}><ArrowDown {...iconProps} /></EntryButton>
                <EntryButton onClick={removeEntry}><Trash {...iconProps} /></EntryButton>
            </div>
        </div>
    );
}

export default Entry;