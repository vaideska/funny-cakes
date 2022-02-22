import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { AuthZModal } from './AuthZModal';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectAuthZModalState } from '../../store/slices/authZ/authZSelectors';
import { closeAuthZModal } from '../../store/slices/authZ/authZSlice';

export const AuthZModalContainer = () => {
  const { isOpen, variant } = useSelector(selectAuthZModalState);
  const dispatch = useAppDispatch();
  const handleModalClose = useCallback(() => {
    dispatch(closeAuthZModal());
  }, []);

  return (
    <AuthZModal
      isOpen={isOpen}
      variant={variant}
      handleModalClose={handleModalClose}
    />
  );
};
