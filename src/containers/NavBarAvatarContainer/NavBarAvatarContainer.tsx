import { useCallback, useState } from 'react'
import { NavBarAvatar } from '../../components/NavBarAvatar'

export const NavBarAvatarContainer = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

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
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
        />
    )
}
