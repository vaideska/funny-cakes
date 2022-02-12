import { LockOpenOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react'

interface FormLoginProps {
  loginUser: FormEventHandler<HTMLFormElement>,
  handleEmailChange: ChangeEventHandler<HTMLInputElement>,
  handlePasswordChange: ChangeEventHandler<HTMLInputElement>,
  handleSetFormVariantClick: MouseEventHandler<HTMLAnchorElement>,

  emailLogin: string,
  passLogin: string,
}

export const FormLogin = ({
  loginUser,
  handleEmailChange,
  handlePasswordChange,
  handleSetFormVariantClick,

  emailLogin,
  passLogin,
}: FormLoginProps) => {
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
      <Typography component="h3" variant="h5" sx={{textAlign: 'center'}}>
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
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
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
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 1,
          }}
        >
          <Link href="#" variant="body2" sx={{textAlign: 'center'}} onClick={handleSetFormVariantClick}>
            Нет личного кабинета? Зарегистрироваться
          </Link>
        </Box>
      </Box>
    </Box>
  )
}