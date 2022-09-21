import { EditorView } from '@codemirror/view';

let theme = EditorView.theme(
  {
    '&': {
      border: '1px solid #ddd',
      backgroundColor: '#eee',
    },
    '.cm-content': {},
    '.cm-activeine': {
      backgroundColor: '#eee',
    },
    '&.cm-editor.cm-focused': {
      outline: '1px solid blue',
      backgroundColor: 'white',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {},
  },
  { dark: false }
);

export default theme;
