export type EntryType = 'code' | 'text';
export type MoveDirection = 'up' | 'down';

export interface Entry {
    index: number;
    entryId: string;
    content: string;
    type: EntryType;
}

export interface Page {
    pageId: string; // ex: 1p6lery1
    title: string; // ex: Page-1
    entries: Record<string, Entry>; // ex: { 'mm4bxyyt': Entry, 'cm6i2wa2': Entry, 'cxc34dey': Entry }
    order: string[]; //ex: ['mm4bxyyt', 'cm6i2wa2', 'cxc34dey']
    runCount: number;
    inFocus: string;
    codes: Record<string, string>;
}

export interface AppState {
    pages: Record<string, Page>; // array of page ids | ex: ['1p6lery1']
    active: string;
    order: string[];
    pageCount: number; // increases everytime a page is added. Does not decrement
}

export interface Tab {
    index: number;
    name: string;
    content: string;
}
