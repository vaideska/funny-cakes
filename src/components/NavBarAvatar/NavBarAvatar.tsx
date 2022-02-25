import { MouseEvent } from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Badge,
  SxProps,
} from '@mui/material';
import { PopoverProps } from '@mui/material/Popover';

interface NavBarAvatarProps {
  sx?: SxProps;
  menuIsOpen: boolean;
  menuAnchorEl: null | PopoverProps['anchorEl'];
  handleLogoutBtnClick: () => void;
  handleOpenMenu: (e: MouseEvent) => void;
  handleCloseMenu: () => void;
  avatar: string | undefined;
  handleMyRecipesButton: () => void;
}

export const NavBarAvatar = ({
  sx,
  menuIsOpen,
  menuAnchorEl,
  handleLogoutBtnClick,
  handleOpenMenu,
  handleCloseMenu,
  avatar,
  handleMyRecipesButton,
}: NavBarAvatarProps) => {
  return (
    <Box sx={sx}>
      <Tooltip title="Открыть меню пользователя">
        <Badge>
          <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
            <Avatar alt="Avatar" src={avatar} />
          </IconButton>
        </Badge>
      </Tooltip>
      <Menu
        open={menuIsOpen}
        anchorEl={menuAnchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ 
          mt: 1,
          '& .MuiMenuItem-root': {
            minHeight: {xs: 32, sm: 36},
          }
        }}
      >
        <MenuItem>
          <Typography
            variant="body2"
            textAlign="center"
            onClick={handleMyRecipesButton}
          >
            Мои рецепты
          </Typography>
        </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Typography
              variant="body2"
              textAlign="center"
              onClick={handleLogoutBtnClick}
            >
              Выйти
            </Typography>
          </MenuItem>
      </Menu>
    </Box>
  );
};
