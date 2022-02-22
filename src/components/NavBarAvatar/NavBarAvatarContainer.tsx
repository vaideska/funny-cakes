import { useCallback, useState } from 'react'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { logout } from '../../store/slices/authZ/authZSlice'
import { NavBarAvatar } from '.'
import { userSelector } from "../../store/slices/authZ/authZSelectors";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import {routes} from "../../utils/routes";
import {useHistory} from "react-router-dom";

export const NavBarAvatarContainer = () => {
    const dispatch = useAppDispatch()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const { profile_picture, firstName } = useSelector(userSelector);
    const history = useHistory();
    const handleModalClose = useCallback(
        () => {
            dispatch(logout());
            signOutUser();
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

    const signOutUser = useCallback(
        () => {
            const auth = getAuth();
            signOut(auth).then(() => {
                console.log('signed out');
            }).catch((error) => {
                console.log('we got some error with signOut')
            });
        }, []
    )

    const handleMyRecipesButton = useCallback(
      () => {
        history.push(routes.myRecipes);
        setMenuIsOpen(false);
      }, []
    )

    return (
        <NavBarAvatar
            menuIsOpen={menuIsOpen}
            menuAnchorEl={menuAnchorEl}
            handleLogoutBtnClick={handleModalClose}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            handleMyRecipesButton={handleMyRecipesButton}
            avatar={profile_picture}
        />
    )
}
