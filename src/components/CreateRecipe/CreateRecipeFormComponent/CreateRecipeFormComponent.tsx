import React, {Dispatch, SetStateAction, FormEventHandler, ChangeEventHandler} from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  Button,
  IconButton,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';

import { Recipe, RecipeIngredient } from '../../../types/recipeType';
import { CreateIngredientListContainer } from '../../../containers/CreateRecipeContainer/CreateIngredientListContainer';
import { CreateTagsContainer } from '../../../containers/CreateRecipeContainer/CreateTagsContainer';


const Input = (props: {}) => {
  return <input type='number' {...props} />
};  

interface CreateRecipeFormComponentProps {
  selectedFile: File, 
  isEditForm: boolean, 
  handleSubmit: FormEventHandler,
  handleChange: ChangeEventHandler,
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredientList: RecipeIngredient[],
  setForm: Dispatch<SetStateAction<Recipe>>,
  handleUploadFile: ChangeEventHandler,
  error: string
}

export const CreateRecipeFormComponent = (
  { selectedFile, isEditForm, handleSubmit, handleChange, setIngredientList, ingredientList, setForm, handleUploadFile, error }
  : CreateRecipeFormComponentProps) => {
 
const InputStyle = styled('input')({
  display: 'none',
});

  return (
  <Container >
    <Typography variant="h5" gutterBottom component="div">Создание рецепта</Typography>
    <Box
      name="create-form"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        '.MuiTypography-root': {m: 1, mb: 0},
        '.MuiButtonBase-root': {m: 1}
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        name="title"
        label="Название"
        onChange={handleChange}
        sx={{width: 450}}
      />
      <br/>
      <TextField
        required
        name="description"
        label="Краткое описание"
        multiline
        onChange={handleChange}
        sx={{width: 450}}
        rows={3}
      />
      <br/>
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
      />
      <br/>
      <Typography variant="h6" gutterBottom component="div">Состав</Typography>
      <CreateIngredientListContainer setIngredientList={setIngredientList} ingredientList={ingredientList} />
      <br/>
      <CreateTagsContainer setForm={setForm} />
      <br/>
      <Box component={'label'} sx={{cursor: 'pointer'}} htmlFor="icon-button-file">
        <InputStyle accept="image/jpeg" id="icon-button-file" type="file" onChange={handleUploadFile}/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        {selectedFile.name !== '' ? selectedFile.name : "Загрузить фотографию"}
      </Box>
      <br/>
      <TextField
        required
        name="recipeText"
        label="Описание рецепта"
        multiline
        onChange={handleChange}
        sx={{width: 450}}
        rows={7}
      />
      <br/>
      <Button disabled={isEditForm ? false : true} variant="contained" type="submit">Опубликовать рецепт</Button>
      {error !== '' ? <Typography color={"red"}>{error}</Typography> : null}
    </Box>
  </Container>
  );
};
