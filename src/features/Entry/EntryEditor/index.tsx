import { useState, useRef, useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateContent } from '../../../features/Notebook/slice'
import CodeMirror, { BasicSetupOptions, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { keymap } from "@codemirror/view"
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import theme from './codemirror-theme'

interface EditorProps {
    entryId: string,
    content: string;
    type: string;
    onSubmit?(code: string): void;
    // onFocus?(): void;
    inFocus: string;
    ref: any;
}

const EntryEditor: React.FC<EditorProps> = forwardRef(({ entryId, content, type, onSubmit, inFocus }, ref: any) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (entryId === inFocus) {
    //             console.log(editor.current)
    //             editor.current.view.focus();
    //             // console.log(editor.current.editor)
    //         }
    //     }, 10)
    // }, [inFocus])

    function onCreate(view: any) {
        view.focus();
    }

    function onChange(value: string) {
        dispatch(updateContent({
            entryId,
            content: value
        }))
    }

    const runCommand = () => {
        onSubmit?.(content);
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
            ref={ref}
            className='code-editor'
            value={content}
            extensions={type === 'code' ? js : md}
            onChange={onChange}
            onCreateEditor={onCreate}
            basicSetup={setup}
            theme={theme}
        />
    );
});

export default EntryEditor;