import { AppState } from '../common/types';

const initialState: AppState = {
  pages: {
    s7uuwdgo: {
      pageId: 's7uuwdgo',
      title: 'Getting Started',
      entries: {
        i5s2sryt: {
          index: 1,
          entryId: 'i5s2sryt',
          content:
            '# Welcome to JS Notebook\n\nJS Notebook is a jupyter notebook clone for javascript. It is an interactive web application that combines live code with narrative text.',
          type: 'text',
        },
        tmrdzvvm: {
          index: 2,
          entryId: 'tmrdzvvm',
          content:
            "### Let's start with a simple javascript code\nClick the code below to select it then press `Shift + Enter` to see the output.",
          type: 'text',
        },
        bay3oy1k: {
          index: 3,
          entryId: 'bay3oy1k',
          content: "console.log('Hello from JS Notebook!')",
          type: 'code',
        },
        zyhfb5jw: {
          index: 4,
          entryId: 'zyhfb5jw',
          content: '### Each entry has its own #root element',
          type: 'text',
        },
        '4uof6mms': {
          index: 5,
          entryId: '4uof6mms',
          content:
            'document.querySelector(\'#root\').innerHTML = "<h3>I am root</h3>"',
          type: 'code',
        },
        w4txw3l7: {
          index: 6,
          entryId: 'w4txw3l7',
          content: '### Import statements are supported',
          type: 'text',
        },
        '3rapytnv': {
          index: 7,
          entryId: '3rapytnv',
          content:
            "import React, {useState} from 'react'\nimport {createRoot} from 'react-dom/client'\n  \nconst App = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>I've been clicked {count} times!</button>\n    </div>\n  )\n}\n\nconst root = createRoot(document.querySelector('#root'));\nroot.render(<App/>)",
          type: 'code',
        },
        q07ofzh6: { index: 8, entryId: 'q07ofzh6', content: '', type: 'code' },
      },
      order: [
        'i5s2sryt',
        'tmrdzvvm',
        'bay3oy1k',
        'zyhfb5jw',
        '4uof6mms',
        'w4txw3l7',
        '3rapytnv',
        'q07ofzh6',
      ],
      runCount: 8,
      inFocus: 'q07ofzh6',
    },
  },
  active: 's7uuwdgo',
  order: ['s7uuwdgo'],
  pageCount: 1,
  title: 'MyNotebook',
};

export default initialState;
