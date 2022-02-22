import React, { useCallback, useEffect } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useSelector } from 'react-redux';
import {
  selectRecipesByOwner,
  selectRecipesStatus,
} from '../../store/slices/recipes/recipesSelectors';
import { useHistory } from 'react-router-dom';
import { RecipesFeed } from '../RecipesFeed';
import { userSelector } from '../../store/slices/authZ/authZSelectors';
import { Container, Typography } from '@mui/material';

export const MyRecipesContainer = () => {
  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus);
  const { id } = useSelector(userSelector);
  const recipes = useSelector(selectRecipesByOwner(id));
  const history = useHistory();
  useEffect(() => {
    if (loadedAll === false) {
      getRecipes();
    }
  }, [getRecipes]);

  const handleRecipeClick = useCallback((recipeData) => {
    history.push('/recipes/' + recipeData.id);
  }, []);
  return (
    <Container sx={{ pt: 4 }}>
      {recipes.length === 0 ? (
        <Typography variant="h5" gutterBottom component="div">
          Вы не добавили ни одного рецепта
        </Typography>
      ) : (
        <Typography variant="h5" gutterBottom component="div">
          Добавленные вами рецепты
        </Typography>
      )}
      <RecipesFeed handleCardClick={handleRecipeClick} recipes={recipes} />
    </Container>
  );
};
