import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectRecipeById,
  selectRecipes,
} from '../../store/slices/recipes/recipesSelectors';
import { CreateRecipeFormContainer } from '../CreateRecipe/CreateRecipeForm';
import { MatchParams } from '../../types/globalTypes';
import { useFirebase } from '../../hooks/useFirebase';
import { PageLoader } from '../UI/PageLoader';

export const EditRecipeContainer = () => {
  const { getRecipeById } = useFirebase();
  const routeParams = useParams<MatchParams>();
  const recipesStoreIsEmpty = !Boolean(
    useSelector(selectRecipes).recipes.length
  );

  const [loading, setLoading] = useState(true);
  const recipe = useSelector(selectRecipeById(routeParams.id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (routeParams.id) {
      if (recipesStoreIsEmpty) {
        getRecipeById(routeParams.id).then((res) => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } else {
      console.log('РЕЦЕПТ НЕ НАЙДЕН');
      // здесь сделаем редирект на 404
    }
  }, []);

  return loading || !recipe ? (
    <PageLoader />
  ) : (
    <CreateRecipeFormContainer recipe={recipe} />
  );
};
