import React, {
  useCallback,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useState,
} from 'react';
import { RecipeInstruction } from '../../../types/recipeType';
import { CreateInstructionList } from '.';

interface CreateInstructionListContainerProps {
  setInstructionList: Dispatch<SetStateAction<RecipeInstruction[]>>;
  instructionList: RecipeInstruction[];
  isEditForm: boolean;
  isLoadFile: boolean;
  setIsLoadFile: Dispatch<SetStateAction<boolean>>;
}

export const CreateInstructionListContainer = ({
  setInstructionList,
  instructionList,
  isEditForm,
  isLoadFile,
  setIsLoadFile,
}: CreateInstructionListContainerProps) => {
  const [selectedFiles, setSelectedFiles] = useState([new File([], '')]);

  const handleAddClick = useCallback(
    (e: MouseEvent) => {
      selectedFiles.push(new File([], ''));
      setInstructionList((prev) => {
        const newState: RecipeInstruction[] = [...prev];
        newState.push({ title: '', text: '' });
        return newState;
      });
    },
    [setInstructionList, selectedFiles]
  );

  const handleDeleteClick = useCallback(
    (id: number) => (e: MouseEvent) => {
      setSelectedFiles((prev) => {
        const newState: File[] = prev.filter((files, index) => index !== id);
        return newState;
      });
      setInstructionList((prev) => {
        const newState: RecipeInstruction[] = prev.filter(
          (instruction, index) => index !== id
        );
        return newState;
      });
    },
    [setInstructionList]
  );

  const propsCreateInstructionList = {
    instructionList,
    setInstructionList,
    handleAddClick,
    handleDeleteClick,
    isEditForm,
    isLoadFile,
    setIsLoadFile,
    selectedFiles,
    setSelectedFiles,
  };

  return <CreateInstructionList {...propsCreateInstructionList} />;
};
