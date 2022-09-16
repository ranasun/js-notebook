import React, { useState, useEffect } from 'react';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {
    addEntry,
    removeEntry,
    moveEntry,
    updateEntryType,
    setFocus,
    addCode,
} from '../../features/Notebook/slice';
import { bundle } from '../../common/bundler';
import {
    ArrowDown,
    ArrowUp,
    CodeBracketsSquare,
    Download,
    Upload,
    TextAlt,
    Trash,
} from 'iconoir-react';
import EntryEditor from './EntryEditor';
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
    const { count, codes, inFocus, order } = useSelector(
        (state: RootState) => state.notebook
    );
    const [prev, setPrev] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [hasFocus, setHasFocus] = useState(false);
    const [isMarkdown, setIsMarkdown] = useState(false);
    const dispatch = useDispatch();
    const ref = React.createRef<any>();

    function toggleEditorType() {
        dispatch(
            updateEntryType({
                entryId,
                type: type === 'code' ? 'text' : 'code',
            })
        );
        setCode('');
        setError('');
    }

    function getPastCodes(id: string): string {
        let bundle = '';
        for (let i = 0; i < order.length; i++) {
            if (id == order[i]) break;
            bundle += codes[order[i]] || '';
        }

        return bundle;
    }

    async function onSubmit() {
        if (type === 'code') {
            dispatch(addCode({ id: entryId, code: content + '\n' }));
            const prev = await bundle(getPastCodes(entryId));
            const output = await bundle(
                getPastCodes(entryId) +
                    `
                    document.querySelector("body").innerHTML = "";
                    document.querySelector("body").innerHTML = '<div id="root"></div>'
                    ` +
                    content
            );
            setIsMarkdown(false);
            setPrev(prev.code);
            setCode(output.code);
            setError(output.err);
        } else {
            setCode(content);
            setError('');
            setIsMarkdown(true);
        }

        const position = order.indexOf(entryId);

        if (position === order.length - 1) {
            dispatch(addEntry(count));
        } else {
            dispatch(setFocus(order[position + 1]));
        }
    }

    useEffect(() => {
        if (inFocus === entryId && ref.current.view) {
            ref.current.view.focus();
        }
    }, [inFocus]);

    function handleMoveUp() {
        dispatch(moveEntry({ entryId, direction: 'up' }));
    }

    function handleMoveDown() {
        dispatch(moveEntry({ entryId, direction: 'down' }));
    }

    function handleAddAbove() {
        const index = order.indexOf(entryId);
        dispatch(addEntry(index));
    }

    function handleAddBelow() {
        const index = order.indexOf(entryId);
        dispatch(addEntry(index + 1));
    }

    function handleRemove() {
        dispatch(removeEntry(entryId));
    }

    function handleDoubleClick() {
        if (isMarkdown) setIsMarkdown(false);
    }

    function onFocus() {
        setHasFocus(true);
    }
    function onBlur() {
        setHasFocus(false);
    }

    const className = `entry-container ${hasFocus ? 'focus' : ''}`;

    const iconProps = {
        color: 'gray',
        fontSize: 14,
    };

    return (
        <div
            className={className}
            tabIndex={index}
            onFocus={onFocus}
            onBlur={onBlur}
            onDoubleClick={handleDoubleClick}
        >
            <div className="entry-block">
                <div className="entry-id">{!isMarkdown && `[${index}]:`}</div>
                <div className="editor-preview">
                    {!isMarkdown && (
                        <EntryEditor
                            ref={ref}
                            entryId={entryId}
                            content={content}
                            type={type}
                            onSubmit={onSubmit}
                            inFocus={inFocus}
                        />
                    )}
                    {type === 'code' && (
                        <CodePreview
                            entryId={entryId}
                            prev={prev}
                            code={code}
                            error={error}
                        />
                    )}
                    {isMarkdown && <TextPreview>{code}</TextPreview>}
                </div>
            </div>
            <div
                className="button-container"
                style={{ display: inFocus === entryId ? 'flex' : 'none' }}
            >
                <EntryButton onClick={toggleEditorType}>
                    {type === 'code' ? (
                        <CodeBracketsSquare {...iconProps} />
                    ) : (
                        <TextAlt {...iconProps} />
                    )}
                </EntryButton>
                <EntryButton onClick={handleMoveUp}>
                    <ArrowUp {...iconProps} />
                </EntryButton>
                <EntryButton onClick={handleMoveDown}>
                    <ArrowDown {...iconProps} />
                </EntryButton>
                <EntryButton onClick={handleAddAbove}>
                    <Upload {...iconProps} />
                </EntryButton>
                <EntryButton onClick={handleAddBelow}>
                    <Download {...iconProps} />
                </EntryButton>
                <EntryButton onClick={handleRemove}>
                    <Trash {...iconProps} />
                </EntryButton>
            </div>
        </div>
    );
};

export default Entry;
