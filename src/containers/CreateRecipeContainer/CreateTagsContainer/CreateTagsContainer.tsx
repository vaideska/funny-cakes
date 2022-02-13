import React, { useCallback, useState } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { CreateTagsComponent } from '../../../components/CreateRecipe/CreateTagsComponent';

type propsType = {
  setTagList: (tags: string[]) => void;
}

export const CreateTagsContainer = (props: propsType) => {
  const { setTagList } = props;
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setTags(() => {
        const newTags = typeof value === 'string' ? value.split(',') : value;
        setTagList(newTags);
        return newTags;
      } 
    );
  }, [setTagList]);

  const propsCreateTags = {
    tags,
    handleChange
  };

  return <CreateTagsComponent {...propsCreateTags}/>;
};
