import { RootState } from '../..';


export const selectRecipes = (state: RootState) => state.recipes
export const selectRecipeById = (id: string) =>
  (state: RootState) =>
    state.recipes.recipes.find(
      recipe => recipe.id === id
    );