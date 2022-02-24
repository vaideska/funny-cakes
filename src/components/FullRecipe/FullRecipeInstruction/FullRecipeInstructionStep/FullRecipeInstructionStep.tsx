import { Chip, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ResponsiveImage } from '../../../UI/ResponsiveImage';

interface FullRecipeInstructionStep {
  children: any;
  index: number;
  imgURL?: string;
}

export const FullRecipeInstructionStep = ({
  children,
  index,
  imgURL,
}: FullRecipeInstructionStep) => {
  return (
    <Box sx={{ maxWidth: '640px', width: '100%' }}>
      <Divider sx={{ mb: { xs: 1.5, sm: 2 } }}>
        <Chip
          color="primary"
          variant="outlined"
          label={index + 1}
          sx={{
            fontSize: { xs: '16px', sm: '20px' },
            px: { xs: 1, sm: 2 },
            height: { xs: 'auto', sm: '32px' },
          }}
        />
      </Divider>
      <Typography align="justify" sx={{ pb: { xs: 1, sm: 2 } }}>
        {children}
      </Typography>
      {imgURL && (
        <ResponsiveImage src={imgURL} alt={`Фото к шагу`} aspectRatio="50" />
      )}
    </Box>
  );
};
