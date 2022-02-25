import React, { KeyboardEvent, MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  List,
  SwipeableDrawer,
} from '@mui/material';

interface buttonDescription {
  name: string;
  icon: JSX.Element;
  handler: (e: MouseEvent) => void;
}

interface HeaderSwipeableDrawerProps {
  buttonList: buttonDescription[];
  toggleDrawer: (open: boolean) => (event: KeyboardEvent | MouseEvent) => void;
  isOpen: boolean;
}

export const HeaderSwipeableDrawer = ({
  buttonList,
  toggleDrawer,
  isOpen,
}: HeaderSwipeableDrawerProps) => {
  return (
    <Box
      sx={{
        display: { md: 'none', xs: 'block' },
        flex: { xs: '0 1 50%', md: '0 0 auto' },
      }}
    >
      <IconButton color={'inherit'} onClick={toggleDrawer(true)}>
        <MenuIcon
          sx={{
            width: { xs: 24, sm: 32 },
            height: { xs: 24, sm: 32 },
          }}
        />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {buttonList.map(({ name, icon, handler }, index) => (
              <ListItem button key={index} onClick={handler}>
                <ListItemIcon sx={{minWidth: 42}}>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
