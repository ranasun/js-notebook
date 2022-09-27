import React, { forwardRef } from 'react';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { keymap, EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import theme from './EntryEditor.theme';

interface EditorProps {
  pageId?: string;
  entryId?: string;
  content: string;
  type: string;
  onSubmit?(code: string): void;
  onFocus?(e: React.FocusEvent): void;
  onChange?(value: string): void;
  inFocus?: string;
  ref: any;
}

const EntryEditor: React.FC<EditorProps> = forwardRef(
  ({ content, type, onSubmit, onFocus, onChange }, ref: any) => {
    const runCommand = () => {
      onSubmit?.(content);
      return true;
    };

    const extensions = [
      EditorView.lineWrapping,
      type === 'code' ? javascript({ jsx: true }) : markdown(),
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
        data-cy="editor"
        ref={ref}
        className="code-editor"
        value={content}
        onFocus={onFocus}
        extensions={extensions}
        onChange={onChange}
        basicSetup={setup}
        theme={theme}
        autoFocus={true}
      />
    );
  }
);

export default EntryEditor;
