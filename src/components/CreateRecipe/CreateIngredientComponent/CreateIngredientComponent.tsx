import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import { RecipeIngredient } from '../../../types/recipeType'

const Input = (props: {}) => {
  return <input type='number' {...props} />
}

type propsCreteIngredient = {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  ingredient: RecipeIngredient,
  handleSelectChange: (e: SelectChangeEvent<string>) => void
}

export const CreateIngredientComponent = (props: propsCreteIngredient) => {
  const {
    handleChange,
    ingredient,
    handleSelectChange
  } = props;

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
        <MenuItem value={'gr'}>гр</MenuItem>
        <MenuItem value={'ml'}>мл</MenuItem>
        <MenuItem value={'cups'}>стаканов</MenuItem>
      </Select>
    </FormControl>
  </>
  )
}
