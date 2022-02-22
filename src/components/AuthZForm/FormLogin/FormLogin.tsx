import { LockOpenOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { MouseEventHandler } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { LoginFormFields } from '../../../types/authZTypes';

interface FormLoginProps {
  formController: UseFormReturn<LoginFormFields>;
  loginUser: SubmitHandler<LoginFormFields>;
  handleSetFormVariantClick: MouseEventHandler<HTMLAnchorElement>;
  RequestIsPending: boolean;
}

export const FormLogin = ({
  loginUser,
  handleSetFormVariantClick,
  formController,
  RequestIsPending,
}: FormLoginProps) => {
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
        <LockOpenOutlined />
      </Avatar>
      <Typography component="h3" variant="h5" sx={{ textAlign: 'center' }}>
        Вход в личный кабинет
      </Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit(loginUser)}>
        <TextField
          {...register('email')}
          label="Email Address *"
          disabled={RequestIsPending}
          error={errors.email && true}
          margin="normal"
          fullWidth
          autoFocus
        />
        <TextField
          {...register('pass')}
          type="password"
          label="Password *"
          disabled={RequestIsPending}
          error={errors.pass && true}
          helperText={errors.pass?.type === 'min' ? errors.pass?.message : ''}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          disabled={RequestIsPending}
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 1,
          }}
        >
          <Link
            href="#"
            variant="body2"
            sx={{ textAlign: 'center' }}
            onClick={handleSetFormVariantClick}
          >
            Нет личного кабинета? Зарегистрироваться
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
