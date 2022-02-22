import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { RegFormFields } from '../../../types/authZTypes';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormRegisterProps {
  RequestIsPending: boolean;
  formController: UseFormReturn<RegFormFields>;
  registerUser: SubmitHandler<RegFormFields>;
  handleSetFormVariantClick: () => void;
}

export const FormRegister = ({
  RequestIsPending,
  formController,
  registerUser,
  handleSetFormVariantClick,
}: FormRegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formController;

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
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(registerUser)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName')}
              disabled={RequestIsPending}
              error={errors.lastName && true}
              name="firstName"
              fullWidth
              label="Имя"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              disabled={RequestIsPending}
              error={errors.lastName && true}
              fullWidth
              label="Фамилия"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('email')}
              disabled={RequestIsPending}
              error={errors.email && true}
              fullWidth
              label="Email Address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('pass')}
              disabled={RequestIsPending}
              error={
                (errors.pass || errors.repeatPass?.type === 'oneOf') && true
              }
              helperText={
                errors.pass?.type === 'min' ? errors.pass?.message : ''
              }
              fullWidth
              type="password"
              label="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('repeatPass')}
              disabled={RequestIsPending}
              error={errors.repeatPass && true}
              helperText={
                errors?.repeatPass?.type === 'oneOf'
                  ? errors?.repeatPass?.message
                  : ''
              }
              fullWidth
              type="password"
              label="Repeat password"
            />
          </Grid>
        </Grid>
        <Button
          disabled={RequestIsPending}
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Зарегистрироваться
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 1,
          }}
        >
          <Link href="#" variant="body2" onClick={handleSetFormVariantClick}>
            Уже зарегистрированы? Войти
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
