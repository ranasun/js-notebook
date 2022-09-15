import { EditorView } from '@codemirror/view';

let theme = EditorView.theme(
    {
        '&': {
            border: '1px solid #ddd',
            backgroundColor: '#eee',
            // color: "white",
            // backgroundColor: "#034"
        },
        '.cm-content': {
            // caretColor: "#0e9"
        },
        '.cm-activeine': {
            backgroundColor: '#eee',
        },
        '&.cm-editor.cm-focused': {
            // borderLeftColor: "#0e9"
            outline: '1px solid blue',
            backgroundColor: 'white',
        },
        '&.cm-focused .cm-selectionBackground, ::selection': {
            // backgroundColor: "#074"
        },
        '.cm-gutters': {
            // backgroundColor: "#045",
            // color: "#ddd",
            // border: "none"
        },
    },
    { dark: false }
);

export default theme;
