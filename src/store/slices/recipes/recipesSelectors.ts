import { RootState } from '../..';
import { Recipe } from '../../../types/recipeType';

interface TagsMap {
    [key: string]: boolean
}

export const selectRecipes = (state: RootState) => state.recipes
export const selectRecipesStatus = (state: RootState) => state.recipes.status
export const selectRecipeById = (id: string) => 
    (state: RootState) => {
        return state.recipes.recipes.find(
            (recipe: Recipe) => recipe.id === id
        );
    }
export const selectRecipeByType = (type: string) => 
    (state: RootState) => 
        state.recipes.recipes.find(
          recipe => recipe.type === type
        );
export const selectRecipesByTags = (tagsArr: string[]) => ({ recipes: { recipes }}: RootState) => {
    if (!tagsArr.length) {
        return recipes
    }
    const tagsMap:TagsMap = {};
    for (const tag of tagsArr) {
        tagsMap[tag] = true;
    }

    return recipes.filter((recipe: Recipe) => recipe.tags.some((tag) => tagsMap[tag]))
}
