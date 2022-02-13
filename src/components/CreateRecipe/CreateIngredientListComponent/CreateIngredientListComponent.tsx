import React from "react";
import { CreateIngredientContainer } from '../../../containers/CreateRecipeContainer/CreateIngredientContainer';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import { IconButton, Box } from "@mui/material";
import { RecipeIngredient } from '../../../types/recipeType'

type propsCreateIngredientList = {
  countIngredient: number,
  updateIngredients: (id: number, ingredient: RecipeIngredient) => void,
  handleClick: (e: React.SyntheticEvent) => void
};

export const CreateIngredientListComponent = (props: propsCreateIngredientList) => {

  const {
    countIngredient,
    updateIngredients,
    handleClick
  } = props;

  const arr = Array(countIngredient + 1).join('*').split('');

  return (
    <>
      <>
      {arr.map((elem, index) => {
        return (
        <Box component="div" key={index}>
          <CreateIngredientContainer id={index} updateIngredients={updateIngredients}/>
          {index+1 === countIngredient ? <IconButton aria-label="addIngredient" onClick={handleClick}>< AddCircleOutlineTwoToneIcon/></IconButton> : null }
        </Box>
        );
      })} 
      </>
    </>
  )
}
