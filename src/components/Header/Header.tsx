import { MouseEvent } from 'react';
import { AccountCircleRounded, Add } from '@mui/icons-material';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { AppBar, Toolbar, Button, Container, Link, Box } from '@mui/material';

import { NavBarAvatarContainer } from '../NavBarAvatar';
import { HeaderSwipeableDrawerContainer } from './HeaderSwipeableDrawer';

interface HeaderProps {
  isLoged: boolean;
  handleLoginBtnClick: () => void;
  handleLogoClick: (e: MouseEvent) => void;
  handleCreateRecipeClick: (e: MouseEvent) => void;
  handleRecipeBuilderClick: (e: MouseEvent) => void;
}

export const Header = ({
  isLoged,
  handleLogoClick,
  handleLoginBtnClick,
  handleCreateRecipeClick,
  handleRecipeBuilderClick,
}: HeaderProps) => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters={true}>
          <HeaderSwipeableDrawerContainer
            handleRecipeBuilderClick={handleRecipeBuilderClick}
            handleCreateRecipeClick={handleCreateRecipeClick}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: { md: 'left', xs: 'center' },
            }}
          >
            <Link
              href="#"
              variant="h5"
              color="inherit"
              underline="none"
              onClick={handleLogoClick}
            >
              Napoleon
            </Link>
          </Box>
          <Button
            color="inherit"
            variant="text"
            startIcon={<AutoFixHighOutlinedIcon />}
            size="medium"
            sx={{ mx: 3, display: { md: 'flex', xs: 'none' } }}
            onClick={handleRecipeBuilderClick}
          >
            Конструктор рецепта
          </Button>
          {isLoged ? (
            <>
              <Button
                color="inherit"
                variant="text"
                startIcon={<Add />}
                size="medium"
                sx={{ mx: 3, display: { md: 'flex', xs: 'none' } }}
                onClick={handleCreateRecipeClick}
              >
                Добавить рецепт
              </Button>
              <NavBarAvatarContainer />
            </>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<AccountCircleRounded />}
              size="medium"
              sx={{ ml: 2 }}
              onClick={handleLoginBtnClick}
            >
              Войти
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
