import React, { useCallback, useState, Dispatch, SetStateAction, MouseEvent } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientListComponent } from '../../../components/CreateRecipe/CreateIngredientListComponent';

type propsType = {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>
}

export const CreateIngredientListContainer = (props: propsType) => {
  const { setIngredientList } = props;
  const [countIngredient, setCountIngrediend] = useState(1);            //TODO: переделаю на ingredientList.length

  const handleClick = useCallback((e: MouseEvent) => {
    setCountIngrediend(countIngredient + 1);
    setIngredientList((prev) => {
      const newState: RecipeIngredient[] = [...prev];
      newState.push({name: '', unit: 'gr', count: 0});
      return newState;
    });
  }, [countIngredient, setIngredientList]);

  const propsCreateIngredientList = {
    countIngredient,
    setIngredientList,
    handleClick
  }

  return <CreateIngredientListComponent {...propsCreateIngredientList}/>;
};
