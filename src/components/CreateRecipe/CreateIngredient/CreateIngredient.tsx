import React, { ChangeEvent } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import { RecipeIngredient } from '../../../types/recipeType';
import { unitList } from '../../../utils/dictionary';
import { InputNumberComponent } from '../InputNumber';

interface CreateIngredientProps {
  handleChange: (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  ingredient: RecipeIngredient;
  isEditForm: boolean;
}

export const CreateIngredient = ({
  handleChange,
  ingredient,
  isEditForm,
}: CreateIngredientProps) => {
  const ref = React.createRef();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          disabled={!isEditForm}
          name="name"
          label="Ингредиент"
          value={ingredient.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          disabled={!isEditForm}
          name="count"
          label="Количество"
          onChange={handleChange}
          value={ingredient.count === 0 ? '' : ingredient.count}
          type="number"
          InputLabelProps={{
            shrink: ingredient.count === 0 ? false : true,
          }}
          InputProps={{
            inputProps: {
              inputcomponent: InputNumberComponent,
              ref: { ref },
              min: 0.1,
              step: 0.1,
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel id="select-unit">Ед.изм.</InputLabel>
          <Select
            labelId="select-unit"
            id="select-unit"
            name="unit"
            label="Ед.изм."
            disabled={!isEditForm}
            value={ingredient.unit}
            onChange={handleChange}
          >
            {Object.keys(unitList).map((key) => (
              <MenuItem key={key} value={key}>
                {unitList[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
