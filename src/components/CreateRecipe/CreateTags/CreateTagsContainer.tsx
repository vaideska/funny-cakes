import React, { useCallback, Dispatch, SetStateAction, ChangeEvent } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { CreateTags } from './';
import { Recipe } from '../../../types/recipeType';

interface CreateTagsContainerProps {
  setForm: Dispatch<SetStateAction<Recipe>>,
  isEditForm: boolean,
  tags: string[],
}

export const CreateTagsContainer = ({ setForm, isEditForm, tags }: CreateTagsContainerProps) => {

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const newTags = typeof value === 'string' ? value.split(',') : value;
    setForm(prev => ({...prev, 'tags': newTags}));
  }, [setForm]);

  const handleDelete = useCallback((value: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newTags = tags.filter((tag) => tag !== value);
    setForm(prev => ({...prev, 'tags': newTags}));
  }, [setForm, tags]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const propsCreateTags = {
    tags,
    handleChange,
    isEditForm,
    handleDelete,
    handleMouseDown
  };

  return <CreateTags {...propsCreateTags}/>;
};
