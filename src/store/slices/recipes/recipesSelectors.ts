import { RootState } from '../..';


export const selectRecipes = (state: RootState) => state.recipes
export const selectRecipeById = (id: string) =>
  (state: RootState) =>
    state.recipes.recipes.find(
      recipe => recipe.id === id
    );
export const selectRecipesByTags = (tagsArr: string[]) => (state: RootState) => {
    if (tagsArr.length === 0) {
        return state.recipes.recipes
    } else {
        return state.recipes.recipes.filter(recipe =>
          recipe.tags.find(recTag =>
            tagsArr.some(selectedTag =>
              selectedTag === recTag
            )
          )
        )
    }
}
