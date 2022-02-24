import { Container, Grid, Stack } from '@mui/material';
import { ReactElement } from 'react';

interface FullRecipeHeroProps {
  img: ReactElement;
  info: ReactElement;
}

export const FullRecipeHero = ({ img, info }: FullRecipeHeroProps) => {
  return (
    <Container>
      <Stack>
        {img}
        {info}
      </Stack>
    </Container>
  );
};
