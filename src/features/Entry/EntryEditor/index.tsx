import { useState, useRef, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEntryContent, setFocus } from '../../../features/Notebook/slice';
import CodeMirror, {
    BasicSetupOptions,
    ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import theme from './theme';

interface EditorProps {
    entryId: string;
    content: string;
    type: string;
    onSubmit?(code: string): void;
    inFocus: string;
    ref: any;
}

const EntryEditor: React.FC<EditorProps> = forwardRef(
    ({ entryId, content, type, onSubmit, inFocus }, ref: any) => {
        const dispatch = useDispatch();

        function onCreate(view: any) {
            view.focus();
        }

        function onFocus() {
            dispatch(setFocus(entryId));
        }

        function onChange(value: string) {
            dispatch(
                updateEntryContent({
                    entryId,
                    content: value,
                })
            );
        }

        const runCommand = () => {
            onSubmit?.(content);
            return true;
        };

        const js = [
            javascript({ jsx: true }),
            keymap.of([
                {
                    key: 'Shift-Enter',
                    preventDefault: true,
                    run: runCommand,
                },
            ]),
        ];

        const md = [
            markdown(),
            keymap.of([
                {
                    key: 'Shift-Enter',
                    preventDefault: true,
                    run: runCommand,
                },
            ]),
        ];

        const setup: BasicSetupOptions = {
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: false,
        };

        return (
            <CodeMirror
                ref={ref}
                className="code-editor"
                value={content}
                onFocus={onFocus}
                extensions={type === 'code' ? js : md}
                onChange={onChange}
                onCreateEditor={onCreate}
                basicSetup={setup}
                theme={theme}
            />
        );
    }
);

export default EntryEditor;
