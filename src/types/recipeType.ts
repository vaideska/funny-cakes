import { user } from './authZTypes';

export interface RecipeIngredient {
  name: string,
  unit: string,
  count: number
}

export interface Recipe {
  id: string,
  title: string,
  description: string,
  owner: user,
  date: number,
  duration: number,
  diameter: number,
  imgUrl: string,
  tags: string[],
  ingredients: RecipeIngredient[],
  recipeText: string
}

export interface RecipesStatus {
  loadedAll: boolean,
  loading: boolean,
  error: string | null,
}

export interface RecipesTypes {
  status: RecipesStatus
  recipes: Recipe[]
}