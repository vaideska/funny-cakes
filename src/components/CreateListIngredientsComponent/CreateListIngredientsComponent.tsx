import React, { useState } from "react";
import { CreateIngredientComponent } from '../CreateIngredientComponent';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import { IconButton, Box } from "@mui/material";
import { RecipeIngredient } from '../../types/recipeType'

type propsType = {
  setIngredientsList: (igredientList: RecipeIngredient[]) => void;
}

export const CreateListIngredientsComponent = (props: propsType) => {
  const { setIngredientsList } = props;
  const [countIngredient, setCountIngrediend] = useState(1);
  const initialIngredients: RecipeIngredient[] = [];
  const [ingredients, setIngredients] = useState(initialIngredients);

  const handleClick = (e: React.SyntheticEvent) => {
    setCountIngrediend(countIngredient + 1);
    setIngredients((prev) => {
      const newState: RecipeIngredient[] = [...prev];
      newState.push({} as RecipeIngredient);
      return newState;
    });
  }
  
  const arr = Array(countIngredient + 1).join('*').split('');

  const updateIngredients = (id: number, ingredient: RecipeIngredient) => {
    setIngredients((prev) => {
      const newState: RecipeIngredient[] = [...prev];
      newState[id] = ingredient;
      setIngredientsList(newState);
      return newState;
    })
    console.log('ingredients', ingredients);
  }

  return (
    <>
      <>
      {arr.map((elem, index) => {
        return <Box component="div" key={index}><CreateIngredientComponent id={index} updateIngredients={updateIngredients}/></Box>;
      })}
      </>
      <IconButton aria-label="addIngredient" onClick={handleClick}>
          <AddCircleOutlineTwoToneIcon/>
      </IconButton>
    </>
  )
}
