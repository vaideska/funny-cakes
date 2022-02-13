import React, { useCallback, useState } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientComponent } from '../../../components/CreateRecipe/CreateIngredientComponent';
import { SelectChangeEvent } from "@mui/material";

type propsType = {
  updateIngredients: (id: number, ingridient: RecipeIngredient) => void,
  id: number
}

export const CreateIngredientContainer = (props: propsType) => {

  const { updateIngredients, id } = props;

  const initIngredientState: RecipeIngredient = {unit: 'gr', count: 0, name: ''};
  const [ingredient, setIngredient] = useState(initIngredientState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setIngredient({...ingredient, [name]: value});
    updateIngredients(id, ingredient);
  }, [id, ingredient, updateIngredients]);

  const handleSelectChange = useCallback((e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    const newIngredient = {...ingredient, 'unit': value};
    setIngredient(newIngredient);
    updateIngredients(id, newIngredient);                                       //это жесть, не могу понять как еще "толкать" в компоненту List инфу
  }, [id, ingredient, updateIngredients]);                                      //когда попробовала сделать удаление - перерендеринг "верхних" компонент блокировал ввод

  const propsCreteIngredient = {
    handleChange,
    ingredient,
    handleSelectChange
  }

  return <CreateIngredientComponent {...propsCreteIngredient}/>
};
