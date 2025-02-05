import { configureStore } from '@reduxjs/toolkit';
import collectionName from '@/store/slices/state';

export const store = configureStore({
  reducer: {
    chatBot: collectionName,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
