import React from "react";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

const tags = ["Ванильный крем",
  "Шоколадный крем",
  "Красный бархат",
   "Глазурь",
  "Мастика",
  "Ванильный корж"
];

function getStyles(name: string, tag: readonly string[], theme: Theme) {
  return {
    fontWeight:
    tag.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type propsType = {
  setTagList: (tags: string[]) => void;
}

export const CreateTagsComponent = (props: propsType) => {
  const { setTagList } = props;
  const theme = useTheme();
  const [tag, setTag] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tag>) => {
    const {
      target: { value },
    } = event;
    setTag(() => {
        const newTags = typeof value === 'string' ? value.split(',') : value;
        setTagList(newTags);
        return newTags;
      } 
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 450 }}>
        <InputLabel id="demo-multiple-chip-label">Теги</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tag}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, tag, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

