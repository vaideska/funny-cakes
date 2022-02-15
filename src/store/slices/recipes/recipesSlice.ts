import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Recipe} from "../../../components/App/App";
import {recipesZTypes} from "../../../types/recipesZTypes";

const initialState: recipesZTypes = {
  recipes: []
}

export const recipesSlice = createSlice({
  initialState: initialState,
  name: 'recipes',
  reducers: {
    setRecipes: (state, action:PayloadAction<Recipe[]>) => {
      state.recipes = action.payload
    }
  }
})

// Action creator
export const { setRecipes } = recipesSlice.actions;
// Reducer
export const recipesReducer = recipesSlice.reducer;