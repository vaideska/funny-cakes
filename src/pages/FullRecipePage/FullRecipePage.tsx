import { Box } from '@mui/system';
import { FullRecipeContainer } from '../../components/FullRecipe';

interface FullRecipePageProps {
  recipeId?: string;
}

export const FullRecipePage = ({ recipeId }: FullRecipePageProps) => {
  return (
    <Box pt={4} pb={2}>
      <FullRecipeContainer />
    </Box>
  );
};
