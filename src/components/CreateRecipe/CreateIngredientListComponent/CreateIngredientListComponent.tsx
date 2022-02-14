import React, { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { CreateIngredientContainer } from '../../../containers/CreateRecipeContainer/CreateIngredientContainer';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import { IconButton, Box } from "@mui/material";
import { RecipeIngredient } from '../../../types/recipeType'

type propsCreateIngredientList = {
  countIngredient: number,
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  handleClick: MouseEventHandler,
};

export const CreateIngredientListComponent = ({ countIngredient,
                                                setIngredientList,
                                                handleClick}: propsCreateIngredientList) => {

  const arr = Array(countIngredient + 1).join('*').split('');         //TODO: переделаю на просто массив ингредиентов

  return (
    <>
      {arr.map((elem, index) => {
        return (
        <Box component="div" key={index}>
          <CreateIngredientContainer id={index} setIngredientList={setIngredientList}/>
          {index + 1 === countIngredient ? <IconButton aria-label="addIngredient" onClick={handleClick}>< AddCircleOutlineTwoToneIcon/></IconButton> : null }
        </Box>
        );
      })}
    </>
  )
};
