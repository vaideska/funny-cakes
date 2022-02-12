import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react';
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

interface FormRegisterProps {
  registerUser: FormEventHandler<HTMLFormElement>,
  handleChangeFirstName: ChangeEventHandler<HTMLInputElement>,
  handleChangeLastName: ChangeEventHandler<HTMLInputElement>,
  handleChangeEmailReg: ChangeEventHandler<HTMLInputElement>,
  handleChangePassReg: ChangeEventHandler<HTMLInputElement>,
  handleChangePassRepeatReg: ChangeEventHandler<HTMLInputElement>,
  handleSetFormVariantClick: MouseEventHandler<HTMLAnchorElement>,
  
  firstNameReg: string,
  lastNameReg: string,
  emailReg: string,
  passReg: string,
  passRepeatReg: string,
}

export const FormRegister: React.FC<FormRegisterProps> = ({
  registerUser,
  handleChangeFirstName,
  handleChangeLastName,
  handleChangeEmailReg,
  handleChangePassReg,
  handleChangePassRepeatReg,
  handleSetFormVariantClick,

  firstNameReg,
  lastNameReg,
  emailReg,
  passReg,
  passRepeatReg,
}) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              label="Имя"
              autoFocus
              value={firstNameReg}
              onChange={handleChangeFirstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Фамилия"
              name="lastName"
              autoComplete="family-name"
              value={lastNameReg}
              onChange={handleChangeLastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              type='email'
              name="email"
              autoComplete="email"
              value={emailReg}
              onChange={handleChangeEmailReg}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              type='password'
              label="Password"
              autoComplete="new-password"
              value={passReg}
              onChange={handleChangePassReg}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              type='password'
              label="Repeat password"
              autoComplete="new-password"
              value={passRepeatReg}
              onChange={handleChangePassRepeatReg}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size='large'
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 1,
          }}
        >
          <Link href="#" variant="body2" onClick={handleSetFormVariantClick}>
            Уже зарегистрированы? Войти
          </Link>
        </Box>
      </Box>
    </Box>
  )
}