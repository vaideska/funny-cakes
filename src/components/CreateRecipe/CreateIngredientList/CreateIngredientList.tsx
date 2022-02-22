import React, { Dispatch, SetStateAction, MouseEventHandler } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { CreateIngredientContainer } from '../CreateIngredient';
import { IconButton, Box, Grid } from '@mui/material';
import { RecipeIngredient } from '../../../types/recipeType';

interface CreateIngredientListProps {
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>;
  ingredientList: RecipeIngredient[];
  handleAddClick: MouseEventHandler;
  handleDeleteClick: (id: number) => MouseEventHandler;
  isEditForm: boolean;
}

export const CreateIngredientList = ({
  setIngredientList,
  ingredientList,
  handleAddClick,
  handleDeleteClick,
  isEditForm,
}: CreateIngredientListProps) => {
  const countIngredient = ingredientList.length;

  return (
    <>
      {ingredientList.map((ingredient, index) => {
        return (
          <Grid item xs={12} key={`${countIngredient}${index}`}>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={11}>
                  <CreateIngredientContainer
                    id={index}
                    setIngredientList={setIngredientList}
                    ingredient={ingredient}
                    isEditForm={isEditForm}
                  />
                </Grid>
                {countIngredient > 1 ? (
                  <Grid item xs={12} sm={0.5}>
                    <IconButton
                      aria-label="deleteIngredient"
                      onClick={handleDeleteClick(index)}
                      sx={{ mt: 1 }}
                      disabled={!isEditForm}
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                ) : null}
                {index + 1 === countIngredient ? (
                  <Grid item xs={12} sm={0.5}>
                    <IconButton
                      aria-label="addIngredient"
                      onClick={handleAddClick}
                      sx={{ mt: 1 }}
                      disabled={!isEditForm}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </>
  );
};
