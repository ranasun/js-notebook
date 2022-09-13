import { configureStore } from '@reduxjs/toolkit'
import notebookReducer from '../features/Notebook/slice';

export const store = configureStore({
  reducer: {
    notebook: notebookReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch