import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { Recipe } from '../../types/recipeType';
import { FullRecipeHero } from './FullRecipeHero';
import { FullRecipeImg } from './FullRecipeHero/FullRecipeImg';
import { FullRecipeInfo } from './FullRecipeHero/FullRecipeInfo';
import { FullRecipeInstruction } from './FullRecipeInstruction';
import { FullRecipeTags } from './FullRecipeTags';

interface FullRecipeProps {
  recipe: Recipe;
}

export const FullRecipe = ({ recipe }: FullRecipeProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack
      spacing={matches ? 11 : 9}
      sx={{
        alignItems: 'center',
        pt: { xs: 0, sm: 2, lg: 4 },
        pb: { xs: recipe?.tags ? 0 : 4, sm: recipe?.tags ? 2 : 4, lg: 4 },
      }}
    >
      <FullRecipeHero
        img={<FullRecipeImg recipe={recipe} />}
        info={<FullRecipeInfo recipe={recipe} />}
      />
      <FullRecipeInstruction recipe={recipe} />
      {recipe?.tags && <FullRecipeTags recipe={recipe} />}
    </Stack>
  );
};
