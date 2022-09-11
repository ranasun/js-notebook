import { useState, useRef, useEffect } from 'react';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { keymap } from "@codemirror/view"
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { EventEmitter, Events } from '../events/events';
import Theme from '../theme/codemirror-theme'

interface EditorProps {
    id?: number;
    value?: string;
    isMarkdown: boolean;
    onSubmit?(code: string): void;
    onFocus?(): void;
}

const Editor: React.FC<EditorProps> = ({ id, value, onSubmit, onFocus, isMarkdown }) => {
    const editor = useRef<any>();
    const [input, setInput] = useState<any>(value);

    useEffect(() => {
        EventEmitter.subscribe(Events.SET_FOCUS, (entry_id) => {
            if (id === entry_id) {
                editor.current.view.focus();
            }
        });
    }, [])


    function onCreate(view: any) {
        view.focus();
    }

    function onChange(value: string) {
        setInput(value);
    }

    const runCommand = () => {
        onSubmit?.(input);
        return true;
    }

    const js = [
        javascript({ jsx: true }),
        keymap.of([
            {
                key: 'Shift-Enter',
                preventDefault: true,
                run: runCommand,
            },
        ])
    ];

    const md = [
        markdown(),
        keymap.of([
            {
                key: 'Shift-Enter',
                preventDefault: true,
                run: runCommand,
            },
        ])
    ];

    const setup: BasicSetupOptions = {
        lineNumbers: false,
        foldGutter: false,
        highlightActiveLine: false
    }

    return (
        <CodeMirror
            className='code-editor'
            ref={editor}
            value={input}
            extensions={isMarkdown ? md : js}
            onChange={onChange}
            onCreateEditor={onCreate}
            onFocus={onFocus}
            basicSetup={setup}
            theme={Theme}
        />
    );
}

export default Editor;