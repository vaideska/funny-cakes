import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAuthZModalVariant } from '../../../store/slices/authZ/authZSlice';
import { FormRegister } from './FormRegister';
import { useFirebase } from '../../../hooks/useFirebase';
import { RegFormFields } from '../../../types/authZTypes';
import { useSelector } from 'react-redux';
import { selectAuthZStatus } from '../../../store/slices/authZ/authZSelectors';

const validateRules = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email('Некорректный email адрес '),
  pass: yup
    .string()
    .required()
    .min(6, 'Пароль должен быть не менее 6 символов'),
  repeatPass: yup
    .string()
    .required()
    .oneOf([yup.ref('pass'), null], 'Пароли не совпадают'),
});

export const FormRegisterContainer = () => {
  const dispatch = useAppDispatch();
  const { regUser } = useFirebase();
  const RequestIsPending = useSelector(selectAuthZStatus).loading;
  const formController = useForm<RegFormFields>({
    resolver: yupResolver(validateRules),
    mode: 'onSubmit',
  });

  const handleSetFormVariantClick = useCallback(() => {
    dispatch(setAuthZModalVariant());
  }, []);

  const registerUser = ({
    email,
    firstName,
    lastName,
    pass,
  }: RegFormFields) => {
    regUser(email, pass, firstName, lastName);
  };

  return (
    <FormRegister
      formController={formController}
      registerUser={registerUser}
      handleSetFormVariantClick={handleSetFormVariantClick}
      RequestIsPending={RequestIsPending}
    />
  );
};
