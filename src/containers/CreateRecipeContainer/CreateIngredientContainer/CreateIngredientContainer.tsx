import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientComponent } from '../../../components/CreateRecipe/CreateIngredientComponent';
import { SelectChangeEvent } from "@mui/material";

type propsType = {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  id: number
}

export const CreateIngredientContainer = (props: propsType) => {

  const { setIngredientList, id } = props;

  const initIngredientState: RecipeIngredient = {unit: 'gr', count: 0, name: ''};
  const [ingredient, setIngredient] = useState(initIngredientState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const newIngredient = {...ingredient, [name]: value};
    setIngredient(newIngredient);
    setIngredientList((prev) => {                      
      const newState: RecipeIngredient[] = [...prev];
      newState[id] = newIngredient;
      return newState;
    });
  }, [id, ingredient, setIngredientList]);

  const handleSelectChange = useCallback((e: SelectChangeEvent<string>) => {            //TODO: Разобраться с ТС и объединить этот метод с верхним
    const value = e.target.value;
    const newIngredient = {...ingredient, 'unit': value};
    setIngredient(newIngredient);
    setIngredientList((prev) => {                      
      const newState: RecipeIngredient[] = [...prev];
      newState[id] = newIngredient;
      return newState;
    })
  }, [id, ingredient, setIngredientList]);

  const propsCreateIngredient = {
    handleChange,
    ingredient,
    handleSelectChange
  }

  return <CreateIngredientComponent {...propsCreateIngredient}/>
};
