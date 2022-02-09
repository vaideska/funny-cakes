import { createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: 'xl'
            },
        },
    }
});
