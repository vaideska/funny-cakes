import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { CreateTagsComponent } from '../../../components/CreateRecipe/CreateTagsComponent';
import { Recipe } from '../../../types/recipeType';

interface CreateTagsContainerProps {
  setForm: Dispatch<SetStateAction<Recipe>>,
}

export const CreateTagsContainer = ({ setForm }: CreateTagsContainerProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setTags(() => {
        const newTags = typeof value === 'string' ? value.split(',') : value;
        setForm(prev => ({...prev, 'tags': newTags}));
        return newTags;
      } 
    );
  }, [setForm]);

  const propsCreateTags = {
    tags,
    handleChange
  };

  return <CreateTagsComponent {...propsCreateTags}/>;
};
