import React, { Dispatch, SetStateAction, MouseEventHandler } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { CreateInstructionContainer } from '../CreateInstruction';
import { IconButton, Box, Grid, Typography } from '@mui/material';
import { RecipeInstruction } from '../../../types/recipeType';

interface CreateInstructionListProps {
  handleAddClick: MouseEventHandler;
  handleDeleteClick: (id: number) => MouseEventHandler;
  setInstructionList: Dispatch<SetStateAction<RecipeInstruction[]>>;
  instructionList: RecipeInstruction[];
  isEditForm: boolean;
  isLoadFile: boolean;
  setIsLoadFile: Dispatch<SetStateAction<boolean>>;
  selectedFiles: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
}

export const CreateInstructionList = ({
  setInstructionList,
  instructionList,
  handleAddClick,
  handleDeleteClick,
  isEditForm,
  isLoadFile,
  setIsLoadFile,
  selectedFiles,
  setSelectedFiles,
}: CreateInstructionListProps) => {
  const countInstruction = instructionList.length;

  return (
    <>
      {instructionList.map((instruction, index) => {
        return (
          <Grid item xs={12} key={`${countInstruction}${index}`}>
            <Box>
              <Grid container>
                <Grid item xs={12} sm={11}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ mb: -1 }}
                  >{`${index + 1} шаг`}</Typography>
                </Grid>
                {countInstruction > 1 ? (
                  <Grid item xs={12} sm={0.5}>
                    <IconButton
                      aria-label="deleteInstruction"
                      onClick={handleDeleteClick(index)}
                      sx={{ mt: 1 }}
                      disabled={!isEditForm}
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                ) : null}
                {index + 1 === countInstruction ? (
                  <Grid item xs={12} sm={0.5}>
                    <IconButton
                      aria-label="addInstruction"
                      onClick={handleAddClick}
                      sx={{ mt: 1 }}
                      disabled={!isEditForm}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <CreateInstructionContainer
                  id={index}
                  setInstructionList={setInstructionList}
                  instruction={instruction}
                  isEditForm={isEditForm}
                  setIsLoadFile={setIsLoadFile}
                  isLoadFile={isLoadFile}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                />
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </>
  );
};
