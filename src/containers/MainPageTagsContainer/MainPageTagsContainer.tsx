import {tagList} from "../../utils/dictionary";
import {MenuItem, Box, Chip} from "@mui/material";
import React, {useCallback, useState} from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {selectRecipesByTags} from "../../store/slices/recipes/recipesSelectors";
import {useSelector} from "react-redux";

interface MainPageTagsContainerProps {
  tags: string[],
  handleChange: (event: SelectChangeEvent<string[]>) => void
}

export const MainPageTagsContainer = ({tags, handleChange}: MainPageTagsContainerProps) => {

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Выберите теги</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          required
          //disabled={!isEditForm}
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={tagList[value]} label={tagList[value]} />
              ))}
            </Box>
          )}
        >
          {Object.keys(tagList).map((key) => (
            <MenuItem
              key={key}
              value={key}
            >
              {tagList[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>


  )
}