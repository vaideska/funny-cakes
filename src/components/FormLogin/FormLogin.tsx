import React, {useState} from "react";
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

interface FormLoginProps {
  setUser: Function
}

export const FormLogin: React.FC<FormLoginProps> = ({setUser}) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passLogin, setPassLogin] = useState('');

  function loginUser(event: React.FormEvent) {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailLogin, passLogin)
      .then((userCredential) => {
        const user = userCredential.user;
        const {email, uid} = user;
        setUser({email, uid});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  return (
    <form onSubmit={loginUser}>
      <input
        type='email'
        placeholder='email'
        value={emailLogin}
        onChange={(evt) => setEmailLogin(evt.target.value)}
        required
      />
      <input
        type='password'
        placeholder='password'
        value={passLogin}
        onChange={(evt) => setPassLogin(evt.target.value)}
        required
      />
      <button type='submit'>login user</button>
    </form>
  )
}