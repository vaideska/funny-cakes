import React from "react";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { tagList } from '../../../utils/dictionary';

interface CreateTagsProps {
  tags: string[],
  handleChange: (event: SelectChangeEvent<string[]>) => void,
  isEditForm: boolean
}

export const CreateTags = ({ tags, handleChange, isEditForm }: CreateTagsProps) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Теги *</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          required
          disabled={!isEditForm}
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
  );
}
