import { configureStore } from '@reduxjs/toolkit'
import loggedInStateReducer from './loginSlice';

export const store = configureStore({
  reducer: {
    loggedin : loggedInStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch