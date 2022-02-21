import React, { KeyboardEvent, MouseEvent, useState } from 'react';
import { Add } from '@mui/icons-material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { HeaderSwipeableDrawer } from '.';

interface HeaderSwipeableDrawerContainerProps {
  handleCreateRecipeClick: (e: MouseEvent) => void,
  handleRecipeBuilderClick: (e: MouseEvent) => void,
}

export const HeaderSwipeableDrawerContainer = ({handleCreateRecipeClick, handleRecipeBuilderClick}: HeaderSwipeableDrawerContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) =>
    (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open);
    };

  const buttonList = [
    {name: 'Добавить рецепт', icon: <Add />, handler: handleCreateRecipeClick},
    {name: 'Контруктор рецепта', icon: <AutoFixHighOutlinedIcon />, handler: handleRecipeBuilderClick}
  ];

  return <HeaderSwipeableDrawer buttonList={buttonList} toggleDrawer={toggleDrawer} isOpen={isOpen}/>
}
