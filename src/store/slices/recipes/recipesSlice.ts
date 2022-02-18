import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Recipe} from "../../../types/recipeType"
import {RecipesTypes} from "../../../types/recipeType";

const initialState: RecipesTypes = {
  status: {
    loadedAll: false,
    loading: false,
    error: null
  },
  recipes: []
}

export const recipesSlice = createSlice({
  initialState: initialState,
  name: 'recipes',
  reducers: {
    setRecipes: (state, { payload }:PayloadAction<Recipe[]>) => {
      state.status.loadedAll = true
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