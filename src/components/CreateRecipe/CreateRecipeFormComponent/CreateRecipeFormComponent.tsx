import React, {Dispatch, SetStateAction, FormEventHandler, ChangeEventHandler, useRef} from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  InputAdornment,
  IconButton,
  Container,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';import { LoadingButton } from '@mui/lab';

import { Recipe, RecipeIngredient } from '../../../types/recipeType';
import { CreateIngredientListContainer } from '../../../containers/CreateRecipeContainer/CreateIngredientListContainer';
import { CreateTagsContainer } from '../../../containers/CreateRecipeContainer/CreateTagsContainer';
import { InputNumberComponent } from '../InputNumberComponent';

interface CreateRecipeFormComponentProps {
  selectedFile: File, 
  isEditForm: boolean, 
  handleSubmit: FormEventHandler,
  handleChange: ChangeEventHandler,
  setIngredientList: Dispatch<SetStateAction<RecipeIngredient[]>>,
  ingredientList: RecipeIngredient[],
  setForm: Dispatch<SetStateAction<Recipe>>,
  handleUploadFile: ChangeEventHandler,
  error: string,
  isLoadFile: boolean
}

export const CreateRecipeFormComponent = (
  { selectedFile, isEditForm, handleSubmit, handleChange, setIngredientList, ingredientList, setForm, handleUploadFile, error, isLoadFile }
  : CreateRecipeFormComponentProps) => {
 
  const InputStyle = styled('input')({
    display: 'none',
  });
  const ref = useRef();

  return (
  <Container sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <Box
      name="create-form"
      component="form"
      maxWidth={800}
      sx={{
        pt: 4, 
        pb: 10
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">Создание рецепта</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            disabled={!isEditForm}
            name="title"
            label="Название"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            disabled={!isEditForm}
            name="description"
            label="Краткое описание"
            multiline
            onChange={handleChange}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            disabled={!isEditForm}
            name="diameter"
            type="number"
            label="Диаметр"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">см. <PieChartOutlineOutlinedIcon/></InputAdornment>,
              inputProps: {
                inputcomponent: InputNumberComponent,
                ref: {ref},
                min: 5,
                max: 50,
                step: 0.5
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            disabled={!isEditForm}
            name="duration"
            type="number"
            label="Общее время"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">мин. <AccessTimeTwoToneIcon/></InputAdornment>,
              inputProps: {
                inputcomponent: InputNumberComponent,
                ref: {ref},
                min: 1
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div" sx={{mb: -1}}>Состав</Typography>
        </Grid>
        <CreateIngredientListContainer setIngredientList={setIngredientList} ingredientList={ingredientList} isEditForm={isEditForm}/>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={6}>
          <CreateTagsContainer setForm={setForm} isEditForm={isEditForm}/></Grid>
        <Grid item xs={12}>
          <Box component={'label'} sx={{cursor: 'pointer'}} htmlFor="icon-button-file">
            <InputStyle disabled={!isEditForm} accept="image/jpeg" id="icon-button-file" type="file" onChange={handleUploadFile}/>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
            {selectedFile.name !== '' ? selectedFile.name : "Загрузить фотографию"}
          </Box>
        </Grid>
        <Grid item xs={12}>
            <TextField
            required
            fullWidth
            disabled={!isEditForm}
            name="recipeText"
            label="Описание рецепта"
            multiline
            onChange={handleChange}
            rows={7}
          />
        </Grid>
        {error !== '' ? <Grid item xs={12}><Typography color={"red"}>{error}</Typography></Grid> : null}
        <Grid item xs={12}>
          <LoadingButton 
            loading={isLoadFile}
            loadingPosition="start"
            disabled={!isEditForm}
            startIcon={<LibraryAddOutlinedIcon/>}
            variant="contained" 
            type="submit"
          >
            Опубликовать рецепт
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  </Container>
  );
};
