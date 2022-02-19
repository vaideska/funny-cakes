import React, { useCallback, Dispatch, SetStateAction, ChangeEvent } from "react";
import { RecipeIngredient } from '../../../types/recipeType'
import { CreateIngredientComponent } from '../../../components/CreateRecipe/CreateIngredientComponent';
import { SelectChangeEvent } from "@mui/material";

interface CreateIngredientContainerProps {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredient: RecipeIngredient,
  id: number,
  isEditForm: boolean
}

export const CreateIngredientContainer = ({ setIngredientList, id, ingredient, isEditForm }: CreateIngredientContainerProps) => {

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
    isEditForm
  }

  return <CreateIngredientComponent {...propsCreateIngredient}/>
};
