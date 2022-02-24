import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  selectRecipesByTags,
  selectRecipesStatus,
} from '../../store/slices/recipes/recipesSelectors';
import { useFirebase } from '../../hooks/useFirebase';
import { useHistory } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { MainPage } from './MainPage';
import { Recipe } from '../../types/recipeType';

export const MainPageContainer = () => {
  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus);
  const [tags, setTags] = useState<string[]>([]);
  const recipes = useSelector(selectRecipesByTags(tags, 'full recipe'));
  const history = useHistory();

  useEffect(() => {
    if (!loadedAll) {
      getRecipes();
    }
  }, [getRecipes]);

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setTags(() => {
      return typeof value === 'string' ? value.split(',') : value;
    });
  }, []);

  const handleDelete = useCallback(
    (value: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setTags((prev) => prev.filter((tag) => tag !== value));
    },
    [setTags]
  );

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleCardClick = useCallback(
    (recipe: Recipe) => {
      history.push(`/recipes/${recipe.id}`);
    },
    [history]
  );

  return (
    <MainPage
      loadedAll={loadedAll}
      tags={tags}
      handleChange={handleChange}
      handleCardClick={handleCardClick}
      recipes={recipes}
      handleDelete={handleDelete}
      handleMouseDown={handleMouseDown}
    />
  );
};
