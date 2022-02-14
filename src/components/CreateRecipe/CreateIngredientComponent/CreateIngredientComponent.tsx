import React, { ChangeEventHandler } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import { RecipeIngredient } from '../../../types/recipeType';
import { unitList } from '../../../utils/dictionary';

const Input = (props: {}) => {
  return <input type='number' {...props} />
}

type propsCreateIngredient = {
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  ingredient: RecipeIngredient,
  handleSelectChange: (e: SelectChangeEvent<string>) => void
}

export const CreateIngredientComponent = ({ handleChange, 
                                            ingredient, 
                                            handleSelectChange }: propsCreateIngredient) => {

  return (
  <>
    <TextField
      required
      name="name"
      label="Ингредиент"
      onChange={handleChange}
    />
    <TextField
      sx={{ width: 150 }}
      required
      name="count"
      label="Количество"
      onChange={handleChange}
      type="number"
      InputProps={{
        inputComponent: Input,
        inputProps: {
          min: 0
        }
      }}
    />
    <FormControl sx={{ m: 1, width: 150 }}>
      <InputLabel id="select-unit">Ед.изм.</InputLabel>
      <Select
        labelId="select-unit"
        id="select-unit"
        name="unit"
        label="Unit"
        value={ingredient.unit}
        onChange={handleSelectChange}
      >
        {Object.keys(unitList).map((key) => (
          <MenuItem key={key} value={key}>{unitList[key]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
  )
};
