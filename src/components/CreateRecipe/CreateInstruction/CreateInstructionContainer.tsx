import React, {
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useState,
} from 'react';
import { RecipeInstruction } from '../../../types/recipeType';
import { CreateInstruction } from '.';
import { SelectChangeEvent } from '@mui/material';
import { useFirebase } from '../../../hooks/useFirebase';

interface CreateInstructionContainerProps {
  setInstructionList: Dispatch<SetStateAction<RecipeInstruction[]>>;
  instruction: RecipeInstruction;
  id: number;
  isEditForm: boolean;
  setIsLoadFile: Dispatch<SetStateAction<boolean>>;
  isLoadFile: boolean;
  selectedFiles: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
}

export const CreateInstructionContainer = ({
  setInstructionList,
  id,
  instruction,
  isEditForm,
  setIsLoadFile,
  isLoadFile,
  selectedFiles,
  setSelectedFiles,
}: CreateInstructionContainerProps) => {
  const { uploadFile } = useFirebase();

  const handleChange = useCallback(
    (
      e:
        | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        | SelectChangeEvent<string>
    ) => {
      const name = e.target.name;
      const value = e.target.value;
      setInstructionList((prev) => {
        const newState: RecipeInstruction[] = [...prev];
        newState[id] = { ...prev[id], [name]: value };
        return newState;
      });
    },
    [id, setInstructionList]
  );

  const handleUploadFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileObject = e.target.files ? e.target.files[0] : new File([], '');
      if (fileObject.name === '') return;
      setIsLoadFile(true);
      setSelectedFiles((prev) => {
        const newState = [...prev];
        newState[id] = fileObject;
        return newState;
      });
      uploadFile(fileObject).then((url) => {
        setInstructionList((prev) => {
          const newState: RecipeInstruction[] = [...prev];
          newState[id] = { ...prev[id], imgURL: url };
          setIsLoadFile(false);
          return newState;
        });
      });
    },
    [uploadFile, setInstructionList, setIsLoadFile, setSelectedFiles, id]
  );

  const propsCreateInstruction = {
    handleChange,
    handleUploadFile,
    instruction,
    isEditForm,
    isLoadFile,
    id,
    selectedFile: selectedFiles[id],
  };

  return <CreateInstruction {...propsCreateInstruction} />;
};
