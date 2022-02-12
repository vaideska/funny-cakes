import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import { PhotoCamera } from '@mui/icons-material';
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
  const initFile: any = null;
  const [selectedFile, setSelectedFile] = React.useState(initFile);

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

const handleSelectFile = (e: any) => {      //TODO: не нашла какой тип события для загрузки
  setSelectedFile(e.target.files[0]);
  setForm({...form, 'imgUrl': e.target.files[0].name});   //TODO: что именно загружать в объек для сервера? Отдельный метод с firebase?
}

const InputStyle = styled('input')({
  display: 'none',
});

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
            sx={{width: 450}}
        /><br/>
        <TextField
            required
            name="description"
            label="Краткое описание"
            multiline
            onChange={handleChange}
            sx={{width: 450}}
            rows={3}
        /><br/>
        <TextField
            name="diameter"
            type="number"
            label="Диаметр"
            sx={{width: 200}}
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
            sx={{width: 200}}
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
        <label htmlFor="icon-button-file">
          <InputStyle accept="image/jpeg" id="icon-button-file" type="file" onChange={handleSelectFile}/>
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          <label>{selectedFile ? selectedFile.name : "Загрузить фотографию"}</label>
        </label>
        <br/>
        <TextField
            required
            name="recipeText"
            label="Описание рецепта"
            multiline
            onChange={handleChange}
            sx={{width: 450}}
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
1. Компонент Загрузка картинки +/-
2. Обработка кнопки
3. Отправить на сервер
4. Декомпозировать на компоненты
5. Стилизация
Проблемы:
Количество только целое
Ошибка в консоли с ref и setState

*/