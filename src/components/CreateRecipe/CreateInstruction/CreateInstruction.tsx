import React, { ChangeEvent, ChangeEventHandler } from 'react';
import {
  TextField,
  SelectChangeEvent,
  Grid,
  Box,
  IconButton,
  styled,
} from '@mui/material';
import { RecipeInstruction } from '../../../types/recipeType';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import { ResponsiveImage } from '../../UI/ResponsiveImage';

interface CreateInstructionProps {
  handleChange: (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleUploadFile: ChangeEventHandler;
  instruction: RecipeInstruction;
  isEditForm: boolean;
  isLoadFile: boolean;
  id: number;
  selectedFile: File;
}

export const CreateInstruction = ({
  handleChange,
  handleUploadFile,
  instruction,
  isEditForm,
  isLoadFile,
  id,
  selectedFile,
}: CreateInstructionProps) => {
  const InputStyle = styled('input')({
    display: 'none',
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          disabled={!isEditForm}
          name="title"
          label="Заголовок шага"
          value={instruction.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          disabled={!isEditForm}
          name="text"
          label="Описание шага"
          value={instruction.text}
          onChange={handleChange}
          multiline
          rows={6}
        />
      </Grid>
      <Grid item xs={12}>
        <Box
          component={'label'}
          sx={{ cursor: 'pointer' }}
          htmlFor={`icon-button-file-instruction-${id}`}
        >
          <InputStyle
            disabled={!isEditForm || isLoadFile}
            accept="image/jpeg"
            id={`icon-button-file-instruction-${id}`}
            type="file"
            onChange={handleUploadFile}
          />
          <IconButton
            color="primary"
            disabled={!isEditForm || isLoadFile}
            aria-label="upload picture instruction"
            component="span"
          >
            <PhotoCameraOutlinedIcon />
          </IconButton>
          {selectedFile.name !== ''
            ? isLoadFile
              ? 'Загрузка...'
              : selectedFile.name
            : 'Загрузить фотографию'}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        {instruction.imgURL ? (
          <ResponsiveImage
            src={instruction.imgURL}
            alt={`Фото к шагу ${id + 1}`}
            aspectRatio="50"
          />
        ) : null}
      </Grid>
    </Grid>
  );
};
