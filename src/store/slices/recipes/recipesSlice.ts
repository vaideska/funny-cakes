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
    setRecipes: (state, { payload }:PayloadAction<Recipe[]>) => {
      state.recipes = payload
    },
    addRecipe: (state, { payload }:PayloadAction<Recipe>) => {
      state.recipes.push(payload)
    }
  }
})

// Action creator
export const { setRecipes, addRecipe } = recipesSlice.actions;
// Reducer
export const recipesReducer = recipesSlice.reducer;