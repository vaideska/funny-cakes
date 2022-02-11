import { useCallback, useState } from 'react'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { logout } from '../../store/slices/authZ/authZSlice'
import { NavBarAvatar } from '../../components/NavBarAvatar'

export const NavBarAvatarContainer = () => {
    const dispatch = useAppDispatch()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

    const handleModalClose = useCallback(
        () => {
            dispatch(logout())
        },
        []
    )
    const handleOpenMenu = useCallback(
        (e) => {
            setMenuAnchorEl(e.currentTarget);
            setMenuIsOpen(true);
        },
        []
    )
    const handleCloseMenu = useCallback(
        () => {
            setMenuAnchorEl(null);
            setMenuIsOpen(false);
        },
        []
    )

    return (
        <NavBarAvatar
            menuIsOpen={menuIsOpen}
            menuAnchorEl={menuAnchorEl}
            handleLogoutBtnClick={handleModalClose}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
        />
    )
}
