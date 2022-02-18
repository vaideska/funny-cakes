import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { selectRecipeById } from '../../../store/slices/recipes/recipesSelectors'
import { MatchParams } from '../../../types/globalTypes'
import { PrintComponent } from './PrintComponent';


export const FullRecipePrint = () => {
  const componentRef = useRef(null);
  const routeParams = useParams<MatchParams>()
  const recipe = useSelector(selectRecipeById(routeParams.id))
  return (<>
  <ReactToPrint
    trigger={() => <Button variant="outlined" color="primary">Напечатать рецепт</Button>}
    content={() => componentRef.current}
  />
  {recipe ? <PrintComponent recipe={recipe} ref={componentRef} /> : null}
  </>)
};
