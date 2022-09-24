import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { generateId } from '../common/utils';
import {
  Page,
  Entry,
  AppState,
  MoveDirection,
  EntryType,
} from '../common/types';

const initialState: AppState = {
  pages: {
    s7uuwdgo: {
      pageId: 's7uuwdgo',
      title: 'Page-1',
      entries: {
        i5s2sryt: {
          index: 1,
          entryId: 'i5s2sryt',
          content: '',
          type: 'code',
        },
      },
      order: ['i5s2sryt'],
      runCount: 1,
      inFocus: 'i5s2sryt',
      codes: {},
    },
  },
  active: 's7uuwdgo',
  order: ['s7uuwdgo'],
  pageCount: 1,
  title: 'Untitled',
};

export const appSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<AppState>) => {
      const { pages, active, order, pageCount, title } = action.payload;
      state.pages = pages;
      state.active = active;
      state.order = order;
      state.pageCount = pageCount;
      state.title = title;
    },
    renameNotebook: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addBlankPage: (state) => {
      const entryId = generateId();

      const entry: Entry = {
        index: 1,
        entryId: entryId,
        content: '',
        type: 'code',
      };
      const pageId = generateId();

      const page: Page = {
        pageId: pageId,
        title: `Page-${state.pageCount + 1}`,
        entries: {},
        order: [entryId],
        runCount: 1,
        inFocus: entryId,
        codes: {},
      };

      page.entries[entryId] = entry;

      state.pages[pageId] = page;
      state.order.push(pageId);
      state.active = pageId;
      state.pageCount++;
    },
    addPage: (state, action: PayloadAction<Page>) => {
      const page = action.payload;
      state.pages[page.pageId] = page;
      state.pageCount++;
    },
    removePage: (state, action: PayloadAction<string>) => {
      delete state.pages[action.payload];
      const index = state.order.findIndex((id) => id === action.payload);
      if (index !== -1) state.order.splice(index, 1);
      if (state.order.length === 1) {
        state.active = state.order[0];
      } else if (index > state.order.length - 1) {
        state.active = state.order[state.order.length - 1];
      } else {
        state.active = state.order[index];
      }
    },
    renamePage: (
      state,
      action: PayloadAction<{ pageId: string; title: string }>
    ) => {
      const { pageId, title } = action.payload;
      state.pages[pageId].title = title;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    addEntry: (
      state,
      action: PayloadAction<{ pageId: string; index: number }>
    ) => {
      const { pageId, index } = action.payload;
      addDefaultEntry(state, pageId, index);
    },
    removeEntry: (
      state,
      action: PayloadAction<{ pageId: string; entryId: string }>
    ) => {
      const { pageId, entryId } = action.payload;
      const page = state.pages[pageId];
      delete page.entries[entryId];
      const index = page.order.indexOf(entryId);
      page.order.splice(index, 1);
      if (page.order.length === 0) {
        addDefaultEntry(state, pageId, 0);
      }
    },
    moveEntry: (
      state,
      action: PayloadAction<{
        pageId: string;
        entryId: string;
        direction: MoveDirection;
      }>
    ) => {
      const { pageId, entryId, direction } = action.payload;
      const page = state.pages[pageId];
      const index = page.order.indexOf(entryId);

      if (direction === 'up' && index !== 0) {
        page.order[index] = page.order[index - 1];
        page.order[index - 1] = entryId;
      }

      if (direction === 'down' && index < page.order.length - 1) {
        page.order[index] = page.order[index + 1];
        page.order[index + 1] = entryId;
      }
    },
    updateEntry: (
      state,
      action: PayloadAction<{
        pageId: string;
        entryId: string;
        entry: Entry;
      }>
    ) => {
      const { pageId, entryId, entry } = action.payload;
      const page = state.pages[pageId];
      page.entries[entryId] = entry;
    },
    updateEntryType: (
      state,
      action: PayloadAction<{
        pageId: string;
        entryId: string;
        type: EntryType;
      }>
    ) => {
      const { pageId, entryId, type } = action.payload;
      state.pages[pageId].entries[entryId].type = type;
    },
    updateEntryContent: (
      state,
      action: PayloadAction<{
        pageId: string;
        entryId: string;
        content: string;
      }>
    ) => {
      const { pageId, entryId, content } = action.payload;
      state.pages[pageId].entries[entryId].content = content;
    },
    setFocus: (
      state,
      action: PayloadAction<{ pageId: string; entryId: string }>
    ) => {
      const { pageId, entryId } = action.payload;
      state.pages[pageId].inFocus = entryId;
    },
    addCode: (
      state,
      action: PayloadAction<{
        pageId: string;
        entryId: string;
        code: string;
      }>
    ) => {
      const { pageId, entryId, code } = action.payload;
      state.pages[pageId].codes[entryId] = code;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState); // THIS LINE
  },
});

function addDefaultEntry(state: AppState, pageId: string, index: number) {
  const page = state.pages[pageId];
  const entry: Entry = {
    index: page.runCount + 1,
    entryId: generateId(),
    content: '',
    type: 'code',
  };
  page.entries[entry.entryId] = entry;
  page.order.splice(index, 0, entry.entryId);
  page.runCount += 1;
  page.inFocus = entry.entryId;
}

export const {
  setState,
  renameNotebook,
  addBlankPage,
  addPage,
  removePage,
  renamePage,
  setActivePage,
  addEntry,
  removeEntry,
  moveEntry,
  updateEntry,
  updateEntryType,
  updateEntryContent,
  setFocus,
  addCode,
} = appSlice.actions;

export default appSlice.reducer;
