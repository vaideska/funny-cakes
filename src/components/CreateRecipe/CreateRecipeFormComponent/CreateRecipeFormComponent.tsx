import React from 'react';
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

import { RecipeIngredient } from '../../../types/recipeType';
import { CreateIngredientListConteiner } from '../../../containers/CreateRecipeContainer/CreateIngredientListConteiner';
import { CreateTagsContainer } from '../../../containers/CreateRecipeContainer/CreateTagsContainer';


const Input = (props: {}) => {
  return <input type='number' {...props} />
}

type propsCreateRecipe = {
  selectedFile: any, 
  isEditForm: boolean, 
  handleSubmit: (e: React.SyntheticEvent) => void,
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  setIngredientsList: (igredientList: RecipeIngredient[]) => void,
  setTagList: (tagList: string[]) => void,
  handleUploadFile: (e: any) => void
}

export const CreateRecipeFormComponent = (props: propsCreateRecipe) => {
  const {
    selectedFile, 
    isEditForm, 
    handleSubmit,
    handleChange,
    setIngredientsList,
    setTagList,
    handleUploadFile
  } = props;

const InputStyle = styled('input')({
  display: 'none',
});

  return (
  <Container >
    <Typography variant="h5" gutterBottom component="div">Создание рецепта</Typography>
    <Box
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
      <CreateIngredientListConteiner setIngredientsList={setIngredientsList}/>
      <br/>
      <CreateTagsContainer setTagList={setTagList} />
      <br/>
      <label htmlFor="icon-button-file">
        <InputStyle accept="image/jpeg" id="icon-button-file" type="file" onChange={handleUploadFile}/>
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
      />
      <br/>
      {isEditForm ? <Button variant="contained" type="submit">Опубликовать рецепт</Button> : <Button disabled variant="contained" type="submit">Опубликовать рецепт</Button>}
    </Box>
  </Container>
  );
};
