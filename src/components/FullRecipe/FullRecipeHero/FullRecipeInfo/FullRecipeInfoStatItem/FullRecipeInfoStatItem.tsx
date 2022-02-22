import { Box, SvgIcon, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface FullRecipeHeroInfoItemProps {
  icon?: ReactNode;
  txt?: string | number;
}

export const FullRecipeInfoStatItem = ({
  icon,
  txt,
}: FullRecipeHeroInfoItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <SvgIcon fontSize="large" children={icon} sx={{ mr: 1 }} />
      <Typography children={txt} sx={{ fontSize: 18 }} />
    </Box>
  );
};
