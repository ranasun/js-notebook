import React, { useState, useRef, useEffect } from 'react';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { add, remove, move, updateType, setFocus } from '../../features/Notebook/slice'
import { bundle } from '../../common/bundler';
import { ArrowDown, ArrowUp, CodeBracketsSquare, TextAlt, Trash } from 'iconoir-react';
import EntryEditor from "./EntryEditor";
import EntryButton from './EntryButton';
import CodePreview from './EntryPreview/CodePreview';
import TextPreview from './EntryPreview/TextPreview';
import './style.css';

interface EntryProp {
    index: number;
    entryId: string;
    content: string;
    type: string;
}

const Entry: React.FC<EntryProp> = ({ entryId, content, type, index }) => {
    const count = useSelector((state: RootState) => state.notebook.count);
    const order = useSelector((state: RootState) => state.notebook.order);
    const inFocus = useSelector((state: RootState) => state.notebook.inFocus);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isMarkdown, setIsMarkdown] = useState(false);
    const dispatch = useDispatch()
    const ref = React.createRef<any>();

    function toggleEditorType() {
        dispatch(updateType({
            entryId,
            type: type === 'code' ? 'text' : 'code'
        }));
        setCode('');
        setError('');
    }

    async function prepareData() {
        if (type === 'code') {
            const { code, err } = await bundle(content);
            setIsMarkdown(false)
            setCode(code);
            setError(err);
        } else {
            setCode(content);
            setError('');
            setIsMarkdown(true)
        }

        const position = order.indexOf(entryId);

        if (position === order.length - 1) {
            dispatch(add(count));
        } else {
            dispatch(setFocus(order[position + 1]));
        }
    }

    function moveEntryUp() {
        dispatch(move({ entryId, direction: 'up' }));
    }

    function moveEntryDown() {
        dispatch(move({ entryId, direction: 'down' }));
    }

    function removeEntry() {
        dispatch(remove(entryId));
    }

    function handleDoubleClick() {
        if (isMarkdown) {
            setIsMarkdown(false);
        }
    }

    function onFocus() {
        dispatch(setFocus(entryId));
        // ref.current.view.focus();
    }

    const className = `entry-container ${inFocus === entryId ? 'focus' : ''}`;

    const iconProps = {
        color: "gray",
        fontSize: 12
    }


    return (
        <div className={className} tabIndex={index} onFocus={onFocus} onDoubleClick={handleDoubleClick}>
            <div className="entry-block">
                <div className="entry-id">{!isMarkdown && `[${index}]:`}</div>
                <div className='editor-preview' >
                    {!isMarkdown && <EntryEditor ref={ref} entryId={entryId} content={content} type={type} onSubmit={prepareData} inFocus={inFocus} />}
                    {type === 'code' && <CodePreview entryId={entryId} code={code} error={error} />}
                    {isMarkdown && <TextPreview>{code}</TextPreview>}
                </div>
            </div>
            <div className="button-container" style={{ display: inFocus === entryId ? 'flex' : 'none' }}>
                <EntryButton onClick={toggleEditorType}>
                    {type === 'code' ? <CodeBracketsSquare {...iconProps} /> : <TextAlt {...iconProps} />}
                </EntryButton>
                <EntryButton onClick={moveEntryUp}><ArrowUp {...iconProps} /></EntryButton>
                <EntryButton onClick={moveEntryDown}><ArrowDown {...iconProps} /></EntryButton>
                <EntryButton onClick={removeEntry}><Trash {...iconProps} /></EntryButton>
            </div>
        </div>
    );
}

export default Entry;