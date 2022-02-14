import React, { useCallback, useState, Dispatch, SetStateAction, MouseEvent } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientListComponent } from '../../../components/CreateRecipe/CreateIngredientListComponent';

type propsType = {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredientList: RecipeIngredient[],
}

export const CreateIngredientListContainer = ({ setIngredientList, ingredientList }: propsType) => {

  const handleClick = useCallback((e: MouseEvent) => {
    setIngredientList((prev) => {
      const newState: RecipeIngredient[] = [...prev];
      newState.push({name: '', unit: 'gr', count: 0});
      return newState;
    });
  }, [setIngredientList]);

  const propsCreateIngredientList = {
    ingredientList,
    setIngredientList,
    handleClick
  }

  return <CreateIngredientListComponent {...propsCreateIngredientList}/>;
};
