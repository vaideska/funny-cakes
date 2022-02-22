import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAuthZModalVariant } from '../../../store/slices/authZ/authZSlice';
import { FormLogin } from './FormLogin';
import { useFirebase } from '../../../hooks/useFirebase';
import { LoginFormFields } from '../../../types/authZTypes';
import { selectAuthZStatus } from '../../../store/slices/authZ/authZSelectors';
import { useSelector } from 'react-redux';

const validateRules = yup.object({
  email: yup.string().required().email('Некорректный email адрес '),
  pass: yup
    .string()
    .required()
    .min(6, 'Пароль должен быть не менее 6 символов'),
});

export const FormLoginContainer = () => {
  const dispatch = useAppDispatch();
  const { loginUser } = useFirebase();
  const RequestIsPending = useSelector(selectAuthZStatus).loading;
  const formController = useForm<LoginFormFields>({
    resolver: yupResolver(validateRules),
    mode: 'onSubmit',
  });

  const handleSetFormVariantClick = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(setAuthZModalVariant());
    },
    []
  );

  const handleLoginUser = useCallback((formData: LoginFormFields) => {
    loginUser(formData.email, formData.pass);
  }, []);

  return (
    <FormLogin
      RequestIsPending={RequestIsPending}
      formController={formController}
      loginUser={handleLoginUser}
      handleSetFormVariantClick={handleSetFormVariantClick}
    />
  );
};
