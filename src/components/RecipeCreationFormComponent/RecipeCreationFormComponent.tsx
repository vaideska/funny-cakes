import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, InputAdornment } from '@mui/material';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import { Recipe } from '../../types/RecipeType';
/* 
- Название*                           Basic TextField
- Описание                            Multiline
- Состав*                                                           
      - ингредиент                    Basic TextField
      - кол-во                        Basic TextField + Props
      - ед.измерения                  Select
  - Кнопка Добавить ингредиент        Icon button ???
- Общее время приготовления           OutlinedInput
- Диаметр торта*                      Input Adornments
- Загрузить картинку                  Button ???
- Теги                                Toggle button ???
- Описание рецепта*                   Multiline
- Кнопка Опубликовать                 Primary Button/Loading button

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

export const RecipeCreationFormComponent = () => {

  const initStsteForm: PartitialTodo = {};
  const [form, setForm] = useState(initStsteForm);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('form', form);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({...form, [name]: value});
};

  return (
      <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        '.MuiTypography-root': {m: 1, mb: 0},
        '.MuiButtonBase-root': {m: 1}
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
     >
      <Typography variant="h5" gutterBottom component="div">Создание рецепта</Typography>
      <TextField
            required
            name="title"
            label="Название"
            value={form.title}
            onChange={handleChange}
        /><br/>
        <TextField
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
              endAdornment: <InputAdornment position="end">см. <PieChartOutlineOutlinedIcon/></InputAdornment>
            }}
        />
          <TextField
            name="duration"
            type="number"
            label="Общее время"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">мин. <AccessTimeTwoToneIcon/></InputAdornment>
            }}
        /><br/>
          <Typography variant="h6" gutterBottom component="div">Состав</Typography>
          <TextField
            required
            id="outlined-required"
            label="Ингредиент"
          />
          <TextField
            required
            id="outlined-number"
            label="Количество"
            type="number"
          />
          <FormControl sx={{ m: 1, width: 100 }}>
            <InputLabel id="demo-simple-select-label">Ед.изм.</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Unit"
            >
              <MenuItem>гр</MenuItem>
              <MenuItem>стаканов</MenuItem>
              <MenuItem>мл</MenuItem>
            </Select>
          </FormControl>
          <IconButton aria-label="add">
            <AddCircleOutlineTwoToneIcon/>
          </IconButton>
          <br/>
        <Typography variant="h6" gutterBottom component="div">Теги</Typography>
        
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
1. Доразобралась с формой
2. Убрала style
3. Сделала обработку "простых форм" (разбиралась с TS)

Буду делать:
1. Ограничение на численные поля
2. Компонент ингредиенты
3. Компонент Теги
4. Компонент Загрузка картинки
5. Попробовать все это добро отправить на сервер
6. Стилизация

Вопросы:
"Неправильный" интерфейс у рецептов (предложить сделать пока все поля необязательными)
Решить про стилизацию
Редьюс для Юзера + селекторы
Куда перебрасываем юзера по кнопке? Если в рецепт, как взять его id
Для следующего спринта: редактирование рецепта
*/