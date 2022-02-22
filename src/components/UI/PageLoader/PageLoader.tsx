import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export const PageLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        py: 8,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
