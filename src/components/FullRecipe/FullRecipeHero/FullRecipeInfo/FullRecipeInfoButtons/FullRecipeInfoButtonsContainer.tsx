import React, { MouseEvent, useState } from 'react';
import { useFirebase } from '../../../../../hooks/useFirebase';
import { Recipe } from '../../../../../types/recipeType';

import { FullRecipeInfoButtons } from '.';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../../../utils/routes';

interface FullRecipeInfoButtonsContainerProps {
  recipe: Recipe;
}

export const FullRecipeInfoButtonsContainer = ({
  recipe,
}: FullRecipeInfoButtonsContainerProps) => {
  const { deleteRecipe } = useFirebase();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e: MouseEvent) => {
    deleteRecipe(recipe.id);
    history.replace(routes.myRecipes);
  };

  const handleEdit = (e: MouseEvent) => {
    history.push(`${routes.createRecipe}/${recipe.id}`);
  };

  return (
    <FullRecipeInfoButtons
      recipe={recipe}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      open={open}
    />
  );
};
