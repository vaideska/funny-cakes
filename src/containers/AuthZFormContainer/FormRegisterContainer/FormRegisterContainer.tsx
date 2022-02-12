import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useCallback, useState, MouseEvent, ChangeEvent, FormEvent } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAuthZModalVariant } from '../../../store/slices/authZ/authZSlice';
import { FormRegister } from '../../../components/AuthZForm/FormRegister';

type WriteUserData = (userId: string, firstName: string, lastName: string, email: string | null, profile_picture: string) => void;

export const FormRegisterContainer = () => {
    const [firstNameReg, setFirstNameReg] = useState('')
    const [lastNameReg, setLastNameReg] = useState('')
    const [emailReg, setEmailReg] = useState('');
    const [passReg, setPassReg] = useState('');
    const [passRepeatReg, setPassRepeatReg] = useState('');
    const dispatch = useAppDispatch()

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

    const registerUser = (event: FormEvent) => {
        event.preventDefault();
        if (passReg !== passRepeatReg || passReg.length < 6) {
            console.log('пароли не совпадают или пароль должен быть минимум 6 символов');
            return
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailReg, passReg)
            .then((userCredential) => {
                const user = userCredential.user; // созданный юзер
                console.log(user, 'user registered');
                writeUserData(
                  user.uid,
                  firstNameReg,
                  lastNameReg,
                  user.email,
                  'https://clck.ru/b87cr'
                )
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }


    const writeUserData: WriteUserData = (
      userId,
      firstName,
      lastName,
      email,
      profile_picture
    ) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            id: userId,
            firstName,
            email,
            lastName,
            profile_picture,
        })
            .then(() => {
                console.log('success!')
                dispatch(setAuthZModalVariant());
            })
    }

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
