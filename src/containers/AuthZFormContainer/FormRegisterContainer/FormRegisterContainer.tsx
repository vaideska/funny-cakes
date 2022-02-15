import { useCallback, useState, MouseEvent, ChangeEvent, FormEvent } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAuthZModalVariant } from '../../../store/slices/authZ/authZSlice';
import { FormRegister } from '../../../components/AuthZForm/FormRegister';
import {useFirebase} from "../../../hooks/useFirebase";


export const FormRegisterContainer = () => {
    const [firstNameReg, setFirstNameReg] = useState('')
    const [lastNameReg, setLastNameReg] = useState('')
    const [emailReg, setEmailReg] = useState('');
    const [passReg, setPassReg] = useState('');
    const [passRepeatReg, setPassRepeatReg] = useState('');
    const dispatch = useAppDispatch()
    const { regUser } = useFirebase();

    const handleSetFormVariantClick = useCallback(
        (evt: MouseEvent<HTMLAnchorElement>) => {
            evt.preventDefault()
            dispatch(setAuthZModalVariant())
        },
        [],
    )

    const handleChangeFirstName = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            setFirstNameReg(evt.target.value)
        },
        []
    )

    const handleChangeLastName = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            setLastNameReg(evt.target.value)
        },
        []
    )

    const handleChangeEmailReg = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            setEmailReg(evt.target.value)
        },
        []
    )

    const handleChangePassReg = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            setPassReg(evt.target.value)
        },
        []
    )

    const handleChangePassRepeatReg = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            setPassRepeatReg(evt.target.value)
        },
        []
    )

    const registerUser = useCallback(
      (event: FormEvent) => {
          event.preventDefault();
          if (passReg !== passRepeatReg || passReg.length < 6) {
              console.log('пароли не совпадают или пароль должен быть минимум 6 символов');
              return
          }
          regUser(emailReg, passReg, firstNameReg, lastNameReg);
      }, []
    )

    return (
        <FormRegister
            firstNameReg={firstNameReg}
            lastNameReg={lastNameReg}
            emailReg={emailReg}
            passReg={passReg}
            passRepeatReg={passRepeatReg}

            registerUser={registerUser}
            handleChangeFirstName={handleChangeFirstName}
            handleChangeLastName={handleChangeLastName}
            handleChangeEmailReg={handleChangeEmailReg}
            handleChangePassReg={handleChangePassReg}
            handleChangePassRepeatReg={handleChangePassRepeatReg}
            handleSetFormVariantClick={handleSetFormVariantClick}
        />
    )
}
