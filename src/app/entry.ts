export type EntryType = 'code' | 'text';
export type MoveDirection = 'up' | 'down';
export interface Entry {
    index: number;
    entryId: string;
    content: string;
    type: EntryType;
}