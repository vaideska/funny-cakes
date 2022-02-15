import React, { useCallback, useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientComponent } from '../../../components/CreateRecipe/CreateIngredientComponent';
import { SelectChangeEvent } from "@mui/material";

interface CreateIngredientContainerProps {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredient: RecipeIngredient,
  id: number
}

export const CreateIngredientContainer = ({ setIngredientList, id, ingredient }: CreateIngredientContainerProps) => {

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) => {
    const name = e.target.name;
    const value = e.target.value;
    setIngredientList((prev) => {                      
      const newState: RecipeIngredient[] = [...prev];
      newState[id] = {...prev[id], [name]: value};
      return newState;
    });
  }, [id, setIngredientList]); 

  const propsCreateIngredient = {
    handleChange,
    ingredient,
  }

  return <CreateIngredientComponent {...propsCreateIngredient}/>
};
