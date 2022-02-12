import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { 
  Typography, 
  Box, 
  TextField, 
  InputAdornment 
} from '@mui/material';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import { Recipe, RecipeIngredient } from '../../types/recipeType';
import { CreateListIngredientsComponent } from '../CreateListIngredientsComponent';
import { CreateTagsComponent } from '../CreateTagsComponent';
/* 

interface Recipe {
  id: string,
  title: string,
  description: string,
  owner: string,
  date: number,
  duration: number,
  diameter: number,
  imgUrl: string,
  tags: string[],
  ingredients: RecipeIngredient[],
  recipeText: string
}
*/
type PartitialTodo = Partial<Recipe>;

const Input = (props: {}) => {
  return <input type='number' {...props} />
}

export const CreateRecipeFormComponent = () => {

  const initStsteForm: PartitialTodo = {};
  const [form, setForm] = useState(initStsteForm);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('form!!!', form);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({...form, [name]: value});
};

const setIngredientsList = (igredientList: RecipeIngredient[]) => {
  setForm({...form, 'ingredients': igredientList});
}

const setTagList = (tagList: string[]) => {
  setForm({...form, 'tags': tagList});
}

  return (
      <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        '.MuiTypography-root': {m: 1, mb: 0},
        '.MuiButtonBase-root': {m: 1}
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
     >
      <Typography variant="h5" gutterBottom component="div">Создание рецепта</Typography>
      <TextField
            required
            name="title"
            label="Название"
            onChange={handleChange}
        /><br/>
        <TextField
            required
            name="description"
            label="Краткое описание"
            multiline
            onChange={handleChange}
            rows={3}
        /><br/>
        <TextField
            name="diameter"
            type="number"
            label="Диаметр"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">см. <PieChartOutlineOutlinedIcon/></InputAdornment>,
              inputComponent: Input,
              inputProps: {
                min: 5,
                max: 50
              }
            }}
        />
          <TextField
            name="duration"
            type="number"
            label="Общее время"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">мин. <AccessTimeTwoToneIcon/></InputAdornment>,
              inputComponent: Input,
              inputProps: {
                min: 1
              }
            }}
        /><br/>
          <Typography variant="h6" gutterBottom component="div">Состав</Typography>
            <CreateListIngredientsComponent setIngredientsList={setIngredientsList}/>
          <br/>
          <CreateTagsComponent setTagList={setTagList} />
        <br/>
        <TextField
            required
            name="recipeText"
            label="Описание рецепта"
            multiline
            onChange={handleChange}
            rows={7}
        /><br/>
        <Button variant="contained" type="submit">Опубликовать</Button>
      </Box>
  )
};

/*
Сделала:
1. Ограничение на численные поля +
2. Компонент ингредиенты +
3. Компонент Теги +

Осталось:
1. Компонент Загрузка картинки
2. Обработка кнопки
3. Отправить на сервер
4. Декомпозировать на компоненты
5. Стилизация
Проблемы:
Количество только целое
Ошибка в консоли с ref и setState

*/