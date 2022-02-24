import { Chip, Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactNode } from 'react';
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
      <Divider sx={{ mb: 2 }}>
        <Chip
          color="primary"
          variant="outlined"
          label={index + 1}
          sx={{
            fontSize: '20px',
            px: 2,
          }}
        />
      </Divider>
      {imgURL && <ResponsiveImage
        src={imgURL}
        alt={`Фото к шагу`}
        aspectRatio="50"
      />}
      <Typography align="justify">{children}</Typography>
    </Box>
  );
};
