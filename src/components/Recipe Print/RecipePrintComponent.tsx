import React from 'react';
import style from './RecipePrintComponent.module.css';
import { Recipe } from '../../types/recipeType';
import { unitList } from '../../utils/dictionary';

interface PrintComponentProps {
  recipe: Recipe,
}

const PrintComponent = React.forwardRef(({ recipe }: PrintComponentProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {title, description, owner, duration, diameter, ingredients, recipeText } = recipe;

  return (
    <div className={style.print} ref={ref}>
      <h1>{title}</h1>
      <p>{`Автор: ${owner.firstName} ${owner.lastName}`}</p>
      <p>{description}</p>
      <p>Время приготовления: {duration} минут</p>
      <p>Диаметр торта: {diameter}</p>
      <h2>Состав:</h2>
      <ul>
        {ingredients.map(({ name, unit, count}, index) => {
          return <li key={index}>{`${name} — ${count} ${unitList[unit]}`}</li>
        })}
      </ul>
      <h2>Описание рецепта:</h2>
      <p>{recipeText}</p>
    </div>
  );
});

export const RecipePrintComponent = ({ recipe }: PrintComponentProps) => {
  const componentRef = React.useRef(null);
  return <PrintComponent recipe={recipe} ref={componentRef} />;
};
