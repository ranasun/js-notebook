import { AppState } from '../common/types';

const initialState: AppState = {
  pages: {
    s7uuwdgo: {
      pageId: 's7uuwdgo',
      title: 'Welcome',
      entries: {
        i5s2sryt: {
          index: 1,
          entryId: 'i5s2sryt',
          content:
            '# Welcome to JS Notebook\n\n> JS Notebook is a jupyter notebook clone for javascript\n\n### Features:\n1. Supports import statements\n2. Uses esbuild to bundle javascript codes\n3. Autosaves data using localStorage\n4. Supports Markdown',
          type: 'text',
        },
        il9rda4h: {
          index: 2,
          entryId: 'il9rda4h',
          content: '### Lets start with a simple React application',
          type: 'text',
        },
        f8of8dnu: {
          index: 3,
          entryId: 'f8of8dnu',
          content:
            "import React, {useState} from 'react'\nimport ReactDOM from 'react-dom'\n\nconst App = () => {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>I've been clicked {count} times!</button>\n    </div>\n  )\n}\n\nconst root = ReactDOM.createRoot(document.querySelector('#root'));\nroot.render(<App/>)",
          type: 'code',
        },
        rby4avg3: { index: 8, entryId: 'rby4avg3', content: '', type: 'code' },
      },
      order: ['i5s2sryt', 'il9rda4h', 'f8of8dnu', 'rby4avg3'],
      runCount: 8,
      inFocus: 'rby4avg3',
    },
  },
  active: 's7uuwdgo',
  order: ['s7uuwdgo'],
  pageCount: 1,
  title: 'MyNotebook',
};

export default initialState;
