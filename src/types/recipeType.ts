import { user } from './authZTypes';

export interface RecipeIngredient {
  name: string,
  unit: string,
  count: number
}

export interface Recipe {
  id: string,
  type: string
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

export interface recipesTypes {
  recipes: Recipe[]
}