import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { CreateTagsComponent } from '../../../components/CreateRecipe/CreateTagsComponent';
import { Recipe } from '../../../types/recipeType';

type propsType = {
  setForm: Dispatch<SetStateAction<Recipe>>,
  form: Recipe
}

export const CreateTagsContainer = (props: propsType) => {
  const { setForm, form } = props;
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setTags(() => {
        const newTags = typeof value === 'string' ? value.split(',') : value;
        setForm({...form, 'tags': newTags});
        return newTags;
      } 
    );
  }, [setForm, form]);

  const propsCreateTags = {
    tags,
    handleChange
  };

  return <CreateTagsComponent {...propsCreateTags}/>;
};
