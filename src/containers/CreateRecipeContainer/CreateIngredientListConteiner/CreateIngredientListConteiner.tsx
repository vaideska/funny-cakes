import React, { useCallback, useState } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientListComponent } from '../../../components/CreateRecipe/CreateIngredientListComponent';

type propsType = {
  setIngredientsList: (igredientList: RecipeIngredient[]) => void;
}

export const CreateIngredientListConteiner = (props: propsType) => {
  const { setIngredientsList } = props;
  const [countIngredient, setCountIngrediend] = useState(1);

  const initialIngredients: RecipeIngredient[] = [];
  const [, setIngredients] = useState(initialIngredients);

  const handleClick = useCallback((e: React.SyntheticEvent) => {
    setCountIngrediend(countIngredient + 1);
    setIngredients((prev) => {
      const newState: RecipeIngredient[] = [...prev];
      newState.push({} as RecipeIngredient);
      return newState;
    });
  }, [countIngredient]);
  
  const updateIngredients = useCallback((id: number, ingredient: RecipeIngredient) => {
    setIngredients((prev) => {                      
      const newState: RecipeIngredient[] = [...prev];
      newState[id] = ingredient;
      setIngredientsList(newState);                 //это жесть, не могу понять как еще "толкать" в компоненту Form инфу
      return newState;                              //вызываю setIngredientsList в setIngredients потому что setIngredients ассихронный и в List попадает неактуальная инфа
    })
  }, [setIngredientsList]);

  const propsCreateIngredientList = {
    countIngredient,
    updateIngredients,
    handleClick
  }

  return <CreateIngredientListComponent {...propsCreateIngredientList}/>;
};
