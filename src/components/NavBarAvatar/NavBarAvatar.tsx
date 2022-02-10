import { MouseEvent } from 'react'
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    Badge
} from '@mui/material'

interface NavBarAvatarProps {
    menuIsOpen: boolean,
    menuAnchorEl: any,
    handleOpenMenu: (e: MouseEvent) => void,
    handleCloseMenu: () => void
}

export const NavBarAvatar = ({
    menuIsOpen,
    menuAnchorEl,
    handleOpenMenu,
    handleCloseMenu,
}: NavBarAvatarProps) => {
    return (
        <Box>
            <Tooltip title="Открыть меню пользователя">
                <Badge>
                    <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                        <Avatar alt="Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6HSmZ6V4r6Zb-1BxWZSgJob_SBk_8YIhHIA&usqp=CAU" />
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
                sx={{ mt: 1 }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Typography variant='body1' textAlign="center">Выйти</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
