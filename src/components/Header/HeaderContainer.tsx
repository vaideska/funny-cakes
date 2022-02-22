import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectAuthZStatus } from '../../store/slices/authZ/authZSelectors';
import { openAuthZModal } from '../../store/slices/authZ/authZSlice';
import { Header } from '.';
import { routes } from '../../utils/routes';

export const HeaderContainer = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoged } = useSelector(selectAuthZStatus);

  const handleModalOpen = useCallback(() => {
    dispatch(openAuthZModal());
  }, []);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    history.push('/');
  }, []);

  const handleCreateRecipeClick = useCallback((e) => {
    e.preventDefault();
    history.push(routes.createRecipe);
  }, []);

  const handleRecipeBuilderClick = useCallback((e) => {
    e.preventDefault();
    history.push(routes.recipeBuilder);
  }, []);

  return (
    <Header
      handleLogoClick={handleLogoClick}
      isLoged={isLoged}
      handleLoginBtnClick={handleModalOpen}
      handleCreateRecipeClick={handleCreateRecipeClick}
      handleRecipeBuilderClick={handleRecipeBuilderClick}
    />
  );
};
