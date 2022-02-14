import React from "react";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { tagList } from '../../../utils/dictionary';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name: string, tag: readonly string[], theme: Theme) => {
  return {
    fontWeight:
    tag.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type propsCreateTags = {
  tags: string[],
  handleChange: (event: SelectChangeEvent<string[]>) => void
}

export const CreateTagsComponent = ({ tags, handleChange }: propsCreateTags) => {

  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ m: 1, width: 450 }}>
        <InputLabel id="demo-multiple-chip-label">Теги *</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          required
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
          MenuProps={MenuProps}
        >
          {Object.keys(tagList).map((key) => (
            <MenuItem
              key={key}
              value={key}
              style={getStyles(tagList[key], tags, theme)}
            >
              {tagList[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
