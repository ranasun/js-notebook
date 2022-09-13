import { createSlice } from '@reduxjs/toolkit'

export interface EntryState {
  count: number
}

const initialState: EntryState = {
  count: 0,
}

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
  },
})

export const { increment } = entrySlice.actions

export default entrySlice.reducer