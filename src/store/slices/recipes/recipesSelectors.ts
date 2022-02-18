import { RootState } from '../..';

interface TagsMap {
    [key: string]: boolean
}

export const selectRecipes = (state: RootState) => state.recipes
export const selectRecipeById = (id: string) =>
  (state: RootState) =>
    state.recipes.recipes.find(
      recipe => recipe.id === id
    );
export const selectRecipesByTags = (tagsArr: string[]) => ({ recipes: { recipes }}: RootState) => {
    if (!tagsArr.length) {
        return recipes
    }
    const tagsMap:TagsMap = {};
    for (const tag of tagsArr) {
        tagsMap[tag] = true;
    }

    return recipes.filter((recipe) => recipe.tags.some((tag) => tagsMap[tag]))
}
