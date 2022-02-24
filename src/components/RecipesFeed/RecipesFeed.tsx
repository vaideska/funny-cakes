import { Box, Grid } from '@mui/material';
import { Recipe } from '../../types/recipeType';
import { RecipeFeedItem } from '../RecipesFeedItem';

interface RecipesFeedProps {
  handleCardClick: (recipe: Recipe) => void;
  recipes: Recipe[];
  idCardSelected?: string;
}

export const RecipesFeed = ({
  handleCardClick,
  recipes,
  idCardSelected,
}: RecipesFeedProps) => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems={'center'}>
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <RecipeFeedItem
              key={recipe.id}
              recipe={recipe}
              handleCardClick={() => handleCardClick(recipe)}
              selected={recipe.id === idCardSelected}
            />
          ))}
      </Grid>
    </Box>
  );
};
