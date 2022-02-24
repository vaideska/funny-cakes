import { tagList } from '../../utils/dictionary';
import { MenuItem, Box, Chip } from '@mui/material';
import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

interface MainPageTagsContainerProps {
  tags: string[];
  handleChange: (event: SelectChangeEvent<string[]>) => void;
  handleDelete: (value: string) => ChangeEventHandler;
  handleMouseDown: MouseEventHandler;
}

export const MainPageTags = ({
  tags,
  handleChange,
  handleDelete,
  handleMouseDown,
}: MainPageTagsContainerProps) => {
  return (
    <Box sx={{ pt: 4 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Поиск по тегам</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          required
          value={tags}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Поиск по тегам" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={tagList[value]}
                  label={tagList[value]}
                  onDelete={handleDelete(value)}
                  onMouseDown={handleMouseDown}
                />
              ))}
            </Box>
          )}
        >
          {Object.keys(tagList).map((key) => (
            <MenuItem key={key} value={key}>
              {tagList[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
