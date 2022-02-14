import React, { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { CreateIngredientContainer } from '../../../containers/CreateRecipeContainer/CreateIngredientContainer';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { IconButton, Box } from "@mui/material";
import { RecipeIngredient } from '../../../types/recipeType'

type propsCreateIngredientList = {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredientList: RecipeIngredient[],
  handleClick: MouseEventHandler,
};

export const CreateIngredientListComponent = ({ setIngredientList,
                                                ingredientList,
                                                handleClick }: propsCreateIngredientList) => {
  const countIngredient = ingredientList.length;

  return (
    <>
      {ingredientList.map((ingredient, index) => {
        return (
        <Box component="div" key={index}>
          <CreateIngredientContainer id={index} setIngredientList={setIngredientList} ingredient={ingredient}/>
          {index + 1 === countIngredient ? <IconButton aria-label="addIngredient" onClick={handleClick}>< AddCircleOutlineOutlinedIcon/></IconButton> : null }
        </Box>
        );
      })}
    </>
  )
};
