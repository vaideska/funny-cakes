import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem
} from "@mui/material";
import { RecipeIngredient } from '../../types/recipeType'

const Input = (props: {}) => {
  return <input type='number' {...props} />
}

type cbFunc = (id: number, ingridient: RecipeIngredient) => void;
type propsType = {
  updateIngredients: cbFunc,
  id: number
}

export const CreateIngredientComponent = (props: propsType) => {
  const {updateIngredients, id} = props;

  const initIngredientState: RecipeIngredient = {unit: 'gr', count: 0, name: ''};
  const [ingredient, setIngredient] = useState(initIngredientState);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setIngredient({...ingredient, [name]: value});
    updateIngredients(id, ingredient);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const name = e.target.name;
    const value = e.target.value;
    setIngredient({...ingredient, [name]: value});
    updateIngredients(id, ingredient as RecipeIngredient);
  }

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
