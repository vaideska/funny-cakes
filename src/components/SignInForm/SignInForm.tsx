import { LockOpenOutlined } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material'

export const SignInForm = () => {
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
            <Box component="form" sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
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
