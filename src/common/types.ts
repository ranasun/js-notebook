export type EntryType = 'code' | 'text';
export type MoveDirection = 'up' | 'down';
export type NewEntryPosition = 'above' | 'below';

export interface Entry {
  index: number;
  entryId: string;
  content: string;
  type: EntryType;
}

export interface Page {
  pageId: string;
  title: string;
  entries: Record<string, Entry>;
  order: string[];
  runCount: number;
  inFocus: string;
}

export interface AppState {
  pages: Record<string, Page>;
  active: string;
  order: string[];
  pageCount: number;
  title: string;
}

export interface Tab {
  index: number;
  name: string;
  content: string;
}
