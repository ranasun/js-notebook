import { useCallback, useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { keymap } from "@codemirror/view"
import { javascript } from '@codemirror/lang-javascript';
import './CodeEditor.css';

interface CodeEditorProps {
    onSubmit?(code: string): void;
    onFocus?(code: number | undefined): void;
    index?: number
}

const CodeEditor: React.FC<CodeEditorProps> = ({ index, onSubmit, onFocus }) => {
    const editorRef: any = useRef();
    const [code, setCode] = useState('');

    const onCreate = (view: any) => {
        view.focus();
    }

    const onChange = useCallback((value: string) => {
        setCode(value);
    }, []);


    const setFocus = () => {
        onFocus?.(index);
    }

    const runCommand = () => {
        onSubmit?.(code);
        return true;
    }

    const extensions = [
        javascript({ jsx: true }),
        keymap.of([
            {
                key: 'Shift-Enter',
                preventDefault: true,
                run: runCommand,
            },
        ])
    ];

    return (
        <CodeMirror
            className='code-editor'
            ref={editorRef}
            value={code}
            extensions={extensions}
            onChange={onChange}
            onFocus={setFocus}
            onCreateEditor={onCreate}
        />
    )
}

export default CodeEditor;