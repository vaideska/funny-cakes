import React, { useCallback, Dispatch, SetStateAction, MouseEvent } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientListComponent } from '../../../components/CreateRecipe/CreateIngredientListComponent';

interface CreateIngredientListContainerProps {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredientList: RecipeIngredient[],
}

export const CreateIngredientListContainer = ({ setIngredientList, ingredientList }: CreateIngredientListContainerProps) => {

  const handleAddClick = useCallback((e: MouseEvent) => {
    setIngredientList((prev) => {
      const newState: RecipeIngredient[] = [...prev];
      newState.push({name: '', unit: 'gr', count: 0});
      return newState;
    });
  }, [setIngredientList]);

  const handleDeleteClick = useCallback((id: number) => (e: MouseEvent) => {
    setIngredientList((prev) => {
      const newState: RecipeIngredient[] = prev.filter((ingredient, index) => index !== id);
      return newState;
    });
  }, [setIngredientList]);

  const propsCreateIngredientList = {
    ingredientList,
    setIngredientList,
    handleAddClick,
    handleDeleteClick
  }

  return <CreateIngredientListComponent {...propsCreateIngredientList}/>;
};
