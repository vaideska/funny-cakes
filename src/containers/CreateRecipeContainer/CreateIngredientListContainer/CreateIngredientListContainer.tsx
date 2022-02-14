import React, { useCallback, Dispatch, SetStateAction, MouseEvent } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientListComponent } from '../../../components/CreateRecipe/CreateIngredientListComponent';

type propsType = {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredientList: RecipeIngredient[],
}

export const CreateIngredientListContainer = ({ setIngredientList, ingredientList }: propsType) => {

  const handleAddClick = useCallback((e: MouseEvent) => {
    setIngredientList((prev) => {
      const newState: RecipeIngredient[] = [...ingredientList];
      newState.push({name: '', unit: 'gr', count: 0});
      return newState;
    });
  }, [setIngredientList, ingredientList]);

  const handleDeleteClick = useCallback((id: number) => (e: MouseEvent) => {
    setIngredientList((prev) => {
      const newState: RecipeIngredient[] = ingredientList.filter((ingredient, index) => index !== id);
      return newState;
    });
  }, [setIngredientList, ingredientList]);

  const propsCreateIngredientList = {
    ingredientList,
    setIngredientList,
    handleAddClick,
    handleDeleteClick
  }

  return <CreateIngredientListComponent {...propsCreateIngredientList}/>;
};
