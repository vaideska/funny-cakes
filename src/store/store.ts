import { configureStore } from '@reduxjs/toolkit';
import { authZReducer } from './slices/authZ/authZSlice';
import { recipesReducer } from './slices/recipes/recipesSlice';

export const store = configureStore({
  reducer: {
    AuthZ: authZReducer,
    recipes: recipesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
