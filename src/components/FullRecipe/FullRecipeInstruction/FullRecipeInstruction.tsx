import { Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { Recipe } from '../../../types/recipeType';
import { FullRecipeInstructionStep } from './FullRecipeInstructionStep';

interface FullRecipeInstructionProps {
  recipe: Recipe;
}

export const FullRecipeInstruction = ({
  recipe,
}: FullRecipeInstructionProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container>
      <Typography
        component="h2"
        variant="h5"
        align="center"
        sx={{
          pb: { xs: 3, sm: 5 },
        }}
      >
        Инструкция приготовления
      </Typography>
      <Stack spacing={matches ? 11 : 6} sx={{ alignItems: 'center' }}>
        {recipe.recipeText.map((step, index) => (
          <FullRecipeInstructionStep
            key={index}
            children={step.text}
            index={index}
            imgURL={step.imgURL}
          />
        ))}
      </Stack>
    </Container>
  );
};
