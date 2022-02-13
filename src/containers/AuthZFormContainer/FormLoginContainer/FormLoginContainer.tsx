import React, { useState, useCallback } from "react";
//import {getDatabase, ref, get, child} from "firebase/database";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { login, setAuthZModalVariant } from '../../../store/slices/authZ/authZSlice';
import { FormLogin } from '../../../components/AuthZForm/FormLogin';

export const FormLoginContainer = () => {
    const [emailLogin, setEmailLogin] = useState('');
    const [passLogin, setPassLogin] = useState('');
    const dispatch = useAppDispatch();
    const handleEmailChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => setEmailLogin(evt.target.value),
        []
    )

    const handlePasswordChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => setPassLogin(evt.target.value),
        []
    )

    const handleSetFormVariantClick = useCallback(
        (evt: React.MouseEvent<HTMLAnchorElement>) => {
            evt.preventDefault()
            dispatch(setAuthZModalVariant())
        },
        [],
    )

    function loginUser(event: React.FormEvent) {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailLogin, passLogin)
            .then((userCredential) => {
                const user = userCredential.user;
                if (!user) {
                    throw new Error('User not found')
                }
                //getUserData(user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }

    return (
        <FormLogin 
            loginUser={loginUser}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSetFormVariantClick={handleSetFormVariantClick}
        
            emailLogin={emailLogin}
            passLogin={passLogin}
        />
    )
}
