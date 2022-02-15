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

  const initIngredientState: RecipeIngredient = {...ingredient};
  const [ingredientInForm, setIngredientInForm] = useState(initIngredientState);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) => {
    const name = e.target.name;
    const value = e.target.value;
    setIngredientInForm(prev => {
      const newIngredient = {...prev, [name]: value};
      setIngredientList((prev) => {                      
        const newState: RecipeIngredient[] = [...prev];
        newState[id] = newIngredient;
        return newState;
      });
      return newIngredient;
    });
  }, [id, setIngredientList]);

  const propsCreateIngredient = {
    handleChange,
    ingredient: ingredientInForm,
  }

  return <CreateIngredientComponent {...propsCreateIngredient}/>
};
