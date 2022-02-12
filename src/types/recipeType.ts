export interface RecipeIngredient {
  name: string,
  unit: string,
  count: number
}

export interface Recipe {
  id: string,
  title: string,
  description: string,
  owner: string,
  date: number,
  duration: number,
  diameter: number,
  imgUrl: string,
  tags: string[],
  ingredients: RecipeIngredient[],
  recipeText: string
}
