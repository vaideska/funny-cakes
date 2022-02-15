import React, { useState, useCallback } from "react";
//import {getDatabase, ref, get, child} from "firebase/database";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { login, setAuthZModalVariant } from '../../../store/slices/authZ/authZSlice';
import { FormLogin } from '../../../components/AuthZForm/FormLogin';
import {useFirebase} from "../../../hooks/useFirebase";

export const FormLoginContainer = () => {
    const [emailLogin, setEmailLogin] = useState('');
    const [passLogin, setPassLogin] = useState('');
    const dispatch = useAppDispatch();
    const { loginUser } = useFirebase();

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

    function handleLoginUser(event: React.FormEvent) {
        event.preventDefault();
        loginUser(emailLogin, passLogin);
    }

    return (
        <FormLogin 
            loginUser={handleLoginUser}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            handleSetFormVariantClick={handleSetFormVariantClick}
        
            emailLogin={emailLogin}
            passLogin={passLogin}
        />
    )
}
