import React, {useState} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

type WriteUserData = (userId: string, name: string, email: string | null, imageUrl: string) => void;

export const FormRegister: React.FC = () => {
  const [emailReg, setEmailReg] = useState('');
  const [passReg, setPassReg] = useState('');
  const [passRepeatReg, setPassRepeatReg] = useState('');

  const registerUser = (event: React.FormEvent) => {
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
        // создаем сущность юзера в базе для всякого рода дополнительных данных,
        // пригодится в будущем, только структуру изменим
        writeUserData(user.uid, 'userName', user.email, 'https://images.unsplash.com/photo-1643921330459-6fb64282f467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }


  const writeUserData: WriteUserData = (userId, name, email, imageUrl) => {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    })
      .then(() => {
        console.log('success!')
      })
  }

  return (
    <form onSubmit={registerUser}>
      <input
        type='email'
        placeholder='email'
        value={emailReg}
        onChange={(evt) => setEmailReg(evt.target.value)}
        required
      />
      <input
        type='password'
        placeholder='password'
        value={passReg}
        onChange={(evt) => setPassReg(evt.target.value)}
        required
      />
      <input
        type='password'
        placeholder='repeat password'
        value={passRepeatReg}
        onChange={(evt) => setPassRepeatReg(evt.target.value)}
        required
      />
      <button type='submit'>register user</button>
    </form>
  )
}