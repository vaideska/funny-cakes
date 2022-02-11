import React, { useState } from "react";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { LockOpenOutlined } from '@mui/icons-material'
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material'

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../store/slices/authZ/authZSlice';

export const FormLogin: React.FC = () => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passLogin, setPassLogin] = useState('');
  const dispatch = useAppDispatch()

  function loginUser(event: React.FormEvent) {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailLogin, passLogin)
      .then((userCredential) => {
        const user = userCredential.user;
        const { email, uid } = user;
        dispatch(login())
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOpenOutlined />
      </Avatar>
      <Typography component="h3" variant="h5">
        Вход в личный кабинет
      </Typography>
      <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={loginUser}
      >
        <TextField
          type="email"
          label="Email Address"
          autoComplete="email"
          margin="normal"
          required
          fullWidth
          value={emailLogin}
          onChange={(evt) => setEmailLogin(evt.target.value)}
          autoFocus
        />
        <TextField
          type="password"
          label="Password"
          autoComplete="current-password"
          margin="normal"
          required
          fullWidth
          value={passLogin}
          onChange={(evt) => setPassLogin(evt.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
      </Box>
    </Box>
  )
}