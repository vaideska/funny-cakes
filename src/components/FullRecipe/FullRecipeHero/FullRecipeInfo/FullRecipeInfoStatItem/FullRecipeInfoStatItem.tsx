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
      <SvgIcon
        children={icon}
        sx={{
          mr: { xs: 0.5, sm: 1 },
          width: { xs: 24, sm: 32 },
          height: { xs: 24, sm: 32 },
        }}
      />
      <Typography children={txt} sx={{ pt: { xs: '3px', sm: 0 } }} />
    </Box>
  );
};
