import React, { forwardRef } from 'react';
import {
  Slide,
  Toolbar,
  AppBar,
  Dialog,
  Button,
  Box,
  Container,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenModalProps {
  children: React.ReactElement;
  isOpen: boolean;
  handleClose: () => void;
  handleSelect: () => void;
}

export const FullScreenModal = ({
  children,
  handleClose,
  isOpen,
  handleSelect,
}: FullScreenModalProps) => {
  return (
    <Box>
      <Dialog
        transitionDuration={400}
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed' }}>
          <Container>
            <Toolbar>
              <Button
                onClick={handleClose}
                color="inherit"
                variant="outlined"
                sx={{ mr: 'auto' }}
              >
                Закрыть
              </Button>
              <Button
                onClick={handleSelect}
                color="inherit"
                variant="outlined"
                sx={{ ml: 'auto' }}
              >
                Выбрать рецепт
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container sx={{ pt: 10 }}>{children}</Container>
      </Dialog>
    </Box>
  );
};
