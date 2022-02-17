import React from 'react';
import style from './RecipePrintComponent.module.css';
import { Recipe } from '../../types/recipeType';
import { unitList } from '../../utils/dictionary';
import ReactToPrint from 'react-to-print';
import { Button } from '@mui/material';

interface PrintComponentProps {
  recipe: Recipe,
}

const PrintComponent = React.forwardRef(({ recipe }: PrintComponentProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {title, description, owner, duration, diameter, ingredients, recipeText } = recipe;

  return (
    <div className={style.print} ref={ref}>
      <h3>{title}</h3>
      <p>{`Автор: ${owner.firstName} ${owner.lastName}`}</p>
      <p>{description}</p>
      <p>Время приготовления: {duration} мин.</p>
      <p>Диаметр торта: {diameter} см.</p>
      <h4>Состав:</h4>
      <ul>
        {ingredients.map(({ name, unit, count}, index) => {
          return <li key={index}>{`${name} — ${count} ${unitList[unit]}`}</li>
        })}
      </ul>
      <h4>Инструкция приготовления:</h4>
      <p>{recipeText}</p>
    </div>
  );
});

export const RecipePrintComponent = ({ recipe }: PrintComponentProps) => {
  const componentRef = React.useRef(null);
  return (<>
  <ReactToPrint
    trigger={() => <Button variant="contained">Напечатать рецепт</Button>}
    content={() => componentRef.current}
  />
  <PrintComponent recipe={recipe} ref={componentRef} />
  </>)
};
