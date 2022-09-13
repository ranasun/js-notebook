import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { EntryType, MoveDirection } from '../../app/entry';
import { Entry } from '../../app/entry';

export interface NotebookState {
  entries: Record<string, Entry>;
  order: string[];
  count: number;
  inFocus: string;
}

const initialState: NotebookState = {
  entries: {},
  order: [],
  count: 0,
  inFocus: ''
}

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      addEntry(state, action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.entries[action.payload];
      const index = state.order.indexOf(action.payload);
      state.order.splice(index, 1);
      if (state.order.length === 0) {
        addEntry(state, 0);
      }
    },
    move: (state, action: PayloadAction<{entryId: string, direction: MoveDirection}>) => {
      const {entryId, direction} = action.payload;
      const index = state.order.indexOf(entryId);
      
      if (direction === 'up' && index !== 0) {
        state.order[index] = state.order[index - 1];
        state.order[index - 1] = entryId;
      } 

      if (direction === 'down' && index < state.order.length - 1) {
        state.order[index] = state.order[index + 1];
        state.order[index + 1] = entryId;
      }
    },
    update: (state, action: PayloadAction<{entryId: string, entry: Entry}>) => {
      const { entryId } = action.payload;
      state.entries[entryId] = action.payload.entry;
    },
    updateType: (state, action: PayloadAction<{entryId: string, type: EntryType}>) => {
      const { entryId, type } = action.payload;
      state.entries[entryId].type = type;
    },
    updateContent: (state, action: PayloadAction<{entryId: string, content: string }>) => {
      const { entryId, content } = action.payload;
      state.entries[entryId].content = content;
    },
    setFocus: (state, action: PayloadAction<string>) => {
      state.inFocus = action.payload;
    }
  },
})

function addEntry(state: NotebookState, index: number) {
  const entry: Entry = {
    index: state.count + 1,
    entryId: generateId(),
    content: '',
    type: 'code',
  } 
  state.entries[entry.entryId] = entry;
  if (index === 0) {
    state.order.push(entry.entryId);
  } else {
    state.order.splice(index, 0, entry.entryId);
  }
  state.count += 1;
  state.inFocus = entry.entryId;
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 10);
}



export const { add, remove, move, update, updateType, updateContent, setFocus } = notebookSlice.actions

export default notebookSlice.reducer