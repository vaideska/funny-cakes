import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Recipe } from '../../../../../types/recipeType';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MouseEventHandler } from 'react';

interface FullRecipeInfoButtonsProps {
  recipe: Recipe;
  handleEdit: MouseEventHandler;
  handleDelete: MouseEventHandler;
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export const FullRecipeInfoButtons = ({
  recipe,
  handleEdit,
  handleDelete,
  handleClickOpen,
  handleClose,
  open,
}: FullRecipeInfoButtonsProps) => {
  return (
    <>
      <Tooltip title="Редактировать рецепт">
        <IconButton
          aria-label="edit-recipe"
          color="inherit"
          onClick={handleEdit}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          height: 12,
          my: 'auto',
          mx: 1,
        }}
      />
      <Tooltip title="Удалить рецепт">
        <IconButton
          aria-label="delete-recipe"
          color="inherit"
          onClick={handleClickOpen}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Вы уверены, что хотите удалить рецепт?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>Да</Button>
          <Button onClick={handleClose} autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
