import {selectRecipeById} from '../../../store/slices/recipes/recipesSelectors'
import {CreateRecipeFormContainer} from '.';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

export const Container = () => {

  const recipe = useSelector(selectRecipeById('-MwWhN5INnbDruc5qohV'));
  console.log(recipe);

  return <CreateRecipeFormContainer recipe={recipe}/>
}