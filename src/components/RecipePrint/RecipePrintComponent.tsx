import React from 'react';
import style from './RecipePrintComponent.module.css';
import { Recipe } from '../../types/recipeType';
import { unitList } from '../../utils/dictionary';
import ReactToPrint from 'react-to-print';
import { Button, Typography, List, ListItem } from '@mui/material';

interface PrintComponentProps {
  recipe: Recipe,
}

const PrintComponent = React.forwardRef(({ recipe }: PrintComponentProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const {title, description, owner, duration, diameter, ingredients, recipeText } = recipe;

  return (
    <div className={style.print} ref={ref}>
      <Typography variant="h4">{title}</Typography>
      <Typography>{`Автор: ${owner.firstName} ${owner.lastName}`}</Typography>
      <Typography>{description}</Typography>
      <Typography>Время приготовления: {duration} мин.</Typography>
      <Typography>Диаметр торта: {diameter} см.</Typography>
      <br/>
      <Typography variant="h5">Состав:</Typography>
      <List>
        {ingredients.map(({ name, unit, count}, index) => {
          return <ListItem key={index}>{`${name} — ${count} ${unitList[unit]}`}</ListItem>
        })}
      </List>
      <br/>
      <Typography variant="h5">Инструкция приготовления:</Typography>
      <Typography>{recipeText}</Typography>
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
