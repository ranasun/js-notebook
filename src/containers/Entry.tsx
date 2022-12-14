import React, { useState, useEffect } from 'react';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEntry,
  removeEntry,
  moveEntry,
  updateEntryType,
  setFocus,
  updateEntryContent,
} from '../app/rootReducer';
import { bundle } from '../common/bundler';
import {
  ArrowDown,
  ArrowUp,
  CodeBracketsSquare,
  Download,
  Upload,
  TextAlt,
  Trash,
  PlayOutline,
} from 'iconoir-react';
import EntryEditor from '../components/EntryEditor';
import EntryButton from '../components/EntryButton';
import CodePreview from '../components/CodePreview';
import TextPreview from '../components/TextPreview';

interface EntryProp {
  index: number;
  pageId: string;
  entryId: string;
  content: string;
  type: string;
}

const Entry: React.FC<EntryProp> = ({
  pageId,
  entryId,
  content,
  type,
  index,
}) => {
  const { pages } = useSelector((state: RootState) => state);

  const page = pages[pageId];
  const { inFocus, order, entries, runCount } = page;

  const [prev, setPrev] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  // const [hasFocus, setHasFocus] = useState('');
  const [isMarkdown, setIsMarkdown] = useState(false);
  const dispatch = useDispatch();
  const ref = React.createRef<any>();

  useEffect(() => {
    if (type === 'text') {
      setCode(content);
      setError('');
      setIsMarkdown(true);
    }
  }, []);

  useEffect(() => {
    if (inFocus === entryId && ref.current?.view) {
      ref.current.view.focus();
    }
  }, [inFocus]);

  function toggleEditorType() {
    dispatch(
      updateEntryType({
        pageId,
        entryId,
        type: type === 'code' ? 'text' : 'code',
      })
    );
    setCode('');
    setError('');
    setPrev('');
  }

  function getPastCodes(id: string): string {
    let bundle = '';
    for (let i = 0; i < order.length; i++) {
      if (id == order[i]) break;
      const { type, content } = entries[order[i]];
      if (type === 'code') {
        bundle += content + '\n';
      }
    }

    return bundle;
  }

  async function onSubmit() {
    if (type === 'code') {
      const prev = await bundle(getPastCodes(entryId));
      const output = await bundle(
        getPastCodes(entryId) +
          `document.querySelector('body').innerHTML = '<div id="root"></div>';` +
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
      dispatch(
        addEntry({
          pageId,
          entryId,
          position: 'below',
        })
      );
    } else {
      dispatch(setFocus({ pageId, entryId: order[position + 1] }));
    }
  }

  function handleMoveUp() {
    dispatch(moveEntry({ pageId, entryId, direction: 'up' }));
  }

  function handleMoveDown() {
    dispatch(moveEntry({ pageId, entryId, direction: 'down' }));
  }

  function handleAddAbove() {
    dispatch(addEntry({ pageId, entryId, position: 'above' }));
  }

  function handleAddBelow() {
    dispatch(addEntry({ pageId, entryId, position: 'below' }));
  }

  function handleRemove() {
    dispatch(removeEntry({ pageId, entryId }));
  }

  function handleDoubleClick() {
    if (isMarkdown) setIsMarkdown(false);
  }

  function onFocus() {
    dispatch(setFocus({ pageId, entryId }));
  }

  const iconProps = {
    color: 'gray',
    fontSize: 12,
    strokeWidth: 2,
  };

  return (
    <div
      id={entryId}
      data-cy={`entry`}
      className={`relative mt-1 border-l-[6px] ${
        inFocus === entryId ? 'border-l-slate-300' : 'border-l-transparent'
      }`}
      tabIndex={index}
      onFocus={onFocus}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-start">
        <div className="w-[50px] mt-[5px] mr-[10px] mb-0 ml-0 text-right font-mono text-xs">
          {!isMarkdown && `[${index}]:`}
        </div>
        <div className=" w-full py-1">
          {!isMarkdown && (
            <EntryEditor
              ref={ref}
              content={content}
              type={type}
              onSubmit={onSubmit}
              onFocus={(e) => {
                dispatch(setFocus({ pageId, entryId }));
                const { bottom } = e.target.getBoundingClientRect();
                if (bottom > window.innerHeight) e.target.scrollIntoView();
              }}
              onChange={(value) => {
                dispatch(
                  updateEntryContent({
                    pageId,
                    entryId,
                    content: value,
                  })
                );
              }}
            />
          )}
          {type === 'code' && (code || error) && (
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
        className="absolute top-[6px] right-[2px] flex flex-row gap-[4px]"
        style={{ display: inFocus === entryId ? 'flex' : 'none' }}
      >
        <EntryButton onClick={toggleEditorType} title="Toggle entry type">
          {type === 'code' ? (
            <CodeBracketsSquare data-cy="toggle-entry-type" {...iconProps} />
          ) : (
            <TextAlt data-cy="toggle-entry-type" {...iconProps} />
          )}
        </EntryButton>
        <EntryButton onClick={onSubmit} title="Run">
          <PlayOutline data-cy="submit-entry" {...iconProps} />
        </EntryButton>
        <EntryButton onClick={handleMoveUp} title="Move up">
          <ArrowUp data-cy="move-entry-up" {...iconProps} />
        </EntryButton>
        <EntryButton onClick={handleMoveDown} title="Move down">
          <ArrowDown data-cy="move-entry-down" {...iconProps} />
        </EntryButton>
        <EntryButton onClick={handleAddAbove} title="Add entry above">
          <Upload data-cy="add-entry-above" {...iconProps} />
        </EntryButton>
        <EntryButton onClick={handleAddBelow} title="Add entry below">
          <Download data-cy="add-entry-below" {...iconProps} />
        </EntryButton>
        <EntryButton onClick={handleRemove} title="Remove entry">
          <Trash data-cy="remove-entry" {...iconProps} />
        </EntryButton>
      </div>
    </div>
  );
};

export default Entry;
