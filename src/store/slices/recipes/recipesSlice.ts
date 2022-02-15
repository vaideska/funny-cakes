import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Recipe} from "../../../types/recipeType"
import {recipesTypes} from "../../../types/recipeType";

const initialState: recipesTypes = {
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